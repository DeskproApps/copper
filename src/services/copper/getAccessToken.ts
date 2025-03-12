import { IDeskproClient, proxyFetch } from "@deskpro/app-sdk";

export default async function getAccessToken(
    client: IDeskproClient,
    code: string,
    callbackURL: string
) {
    try {
        const fetch = await proxyFetch(client);

        const response = await fetch(`https://app.copper.com/oauth/token`, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                code: code,
                client_id: "__client_id__",
                client_secret: "__client_secret__",
                redirect_uri: callbackURL,
                grant_type: "authorization_code",
            }).toString()
        });

        if (!response.ok) {
            throw new Error("Failed to fetch access token");
        }

        const data = await response.json()
        return data;
    } catch (error) {
        throw new Error("Error fetching access token");
    }
}