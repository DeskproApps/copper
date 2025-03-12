import { IDeskproClient, proxyFetch as deskproProxyFetch } from "@deskpro/app-sdk";
import { placeholders } from "../../constants";
import { User } from "./types";

/**
 * Returns the data of the active Copper user
 * 
 * @param client  The Deskpro client
 */
export default async function getCurrentUser(client: IDeskproClient): Promise<User | null> {
    try {
        // Use Deskpro's proxy fetch function to make requests
        const proxyFetch = await deskproProxyFetch(client);

        const isUsingOAuth2 = (await client.getUserState<boolean>("isUsingOAuth"))[0]?.data;

        // Prepare request headers
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
            "X-PW-Application": "developer_api",
        };

        // Set authentication headers based on whether OAuth2 or API Key is used
        if (isUsingOAuth2) {
            headers["Authorization"] = `Bearer [user[${placeholders.OAUTH2_ACCESS_TOKEN_PATH}]]`;
        } else {
            headers["X-PW-AccessToken"] = placeholders.API_KEY;
            headers["X-PW-UserEmail"] = placeholders.API_OWNER_EMAIL;
        }

        const response = await proxyFetch("https://api.copper.com/developer_api/v1/account", {
            headers,
        });

        // Handle cases where Copper API returns an error status
        if (!response.ok) {
            throw new Error(`Failed to fetch Copper user`);
        }

        return await response.json() as User;
    } catch (error) {
        return null;
    }
}
