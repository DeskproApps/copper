import { createSearchParams, useNavigate } from "react-router-dom";
import { getAccessToken, getCurrentUser } from "../../services/copper";
import { getEntityListService } from "../../services/deskpro";
import { IOAuth2, OAuth2Result, useDeskproLatestAppContext, useInitialisedDeskproAppClient } from "@deskpro/app-sdk";
import { placeholders } from "../../constants";
import { Settings, UserData } from "../../types";
import { tryToLinkAutomatically } from "../../utils";
import { useCallback, useState } from "react";

interface UseLogin {
    onSignIn: () => void,
    authUrl: string | null,
    error: null | string,
    isLoading: boolean,
};

export default function useLogin(): UseLogin {
    const [authUrl, setAuthUrl] = useState<string | null>(null)
    const [error, setError] = useState<null | string>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isPolling, setIsPolling] = useState(false)
    const [oauth2, setOauth2] = useState<IOAuth2 | null>(null)

    const navigate = useNavigate()

    const { context } = useDeskproLatestAppContext<UserData, Settings>()

    const user = context?.data?.user

    useInitialisedDeskproAppClient(async (client) => {
        if (context?.settings.use_deskpro_saas === undefined || !user) {
            // Make sure settings have loaded.
            return
        }

        // Ensure they aren't using access tokens
        if (context.settings.use_api_key === true) {
            setError("Enable OAuth to access this page");
            return

        }
        const mode = context?.settings.use_deskpro_saas ? 'global' : 'local';

        const clientId = context?.settings.client_id;
        if (mode === 'local' && (typeof clientId !== 'string' || clientId.trim() === "")) {
            // Local mode requires a clientId.
            setError("A client ID is required");
            return
        }

        // Start OAuth process depending on the authentication mode
        const oauth2Temp = mode === "local" ?
            await client.startOauth2Local(
                ({ state, callbackUrl }) => {
                    return `https://app.copper.com/oauth/authorize?${createSearchParams([
                        ["response_type", "code"],
                        ["client_id", clientId ?? ""],
                        ["state", state],
                        ["redirect_uri", callbackUrl],
                        ["scope", "developer/v1/all"],
                    ])}`;
                },
                /\bcode=(?<code>[^&#]+)/,
                async (code: string): Promise<OAuth2Result> => {
                    // Extract the callback URL from the authorization URL
                    const url = new URL(oauth2Temp.authorizationUrl);
                    const redirectUri = url.searchParams.get("redirect_uri");

                    if (!redirectUri) {
                        throw new Error("Failed to get callback URL");
                    }

                    const data = await getAccessToken(client, code, redirectUri);

                    return { data }
                }
            )
            // Global Proxy Service
            : await client.startOauth2Global("TW2mwcHyQwCmkrzNjgdMAQ");

        setAuthUrl(oauth2Temp.authorizationUrl)
        setOauth2(oauth2Temp)

    }, [setAuthUrl, context?.settings.use_deskpro_saas])


    useInitialisedDeskproAppClient((client) => {
        if (!user || !oauth2) {
            return
        }

        const startPolling = async () => {
            try {
                const result = await oauth2.poll();
                await client.setUserState(placeholders.OAUTH2_ACCESS_TOKEN_PATH, result.data.access_token, { backend: true });

                if (result.data.refresh_token) {
                    await client.setUserState(placeholders.OAUTH2_REFRESH_TOKEN_PATH, result.data.refresh_token, { backend: true });
                }

                const activeUser = await getCurrentUser(client);
                if (!activeUser) throw new Error("Error authenticating user");

                try {
                    await tryToLinkAutomatically(client, user);
                    const entityIds = await getEntityListService(client, user.id);
                    navigate(entityIds.length > 0 ? "/home" : "/contacts/link");
                } catch {
                    navigate("/contacts/link");
                }
            } catch (error) {
                setError(error instanceof Error ? error.message : "Unknown error");
            } finally {
                setIsLoading(false)
                setIsPolling(false)
            }
        }

        if (isPolling) {
            startPolling()
        }
    }, [isPolling, user, oauth2, navigate])


    const onSignIn = useCallback(() => {
        setIsLoading(true);
        setIsPolling(true);
        window.open(authUrl ?? "", '_blank');
    }, [setIsLoading, authUrl]);


    return { authUrl, onSignIn, error, isLoading }

}