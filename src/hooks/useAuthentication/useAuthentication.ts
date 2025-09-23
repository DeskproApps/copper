import { getCurrentUser } from "@/services/copper";
import { useQueryWithClient } from "@deskpro/app-sdk";

interface UseAuthenticationParams {
  isUsingOAuth: boolean
}
export default function useAuthentication(params: Readonly<UseAuthenticationParams>) {
  const { isUsingOAuth } = params
  const { isLoading, isFetching, data } = useQueryWithClient(
    ["authStatus", isUsingOAuth.toString()],
    async (client) => {
      try {
        // Store the authentication method in the user state.
        await client.setUserState("isUsingOAuth", isUsingOAuth)

        // Verify authentication status
        // If OAuth2 mode and the user is logged in the request would be make with their stored access token.
        // If in API key mode the request would be made with the API key provided in the app setup.
        const user = await getCurrentUser(client)

        if (!user) {
          return false
        }

        return true
      } catch {
        return false
      }
    }
  )

  return {
    isLoading: Boolean(isLoading || isFetching),
    isAuthenticated: data ?? false
  }
}