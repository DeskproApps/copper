import { ErrorBlock } from "../../components/common";
import { getCurrentUser } from "../../services/copper";
import { getEntityListService } from "../../services/deskpro";
import { LoadingSpinner, useDeskproAppClient, useDeskproElements, useDeskproLatestAppContext, useInitialisedDeskproAppClient } from "@deskpro/app-sdk";
import { Settings, UserData } from "../../types";
import { Stack } from "@deskpro/deskpro-ui";
import { tryToLinkAutomatically } from "../../utils";
import { useNavigate } from "react-router-dom";
import { useState, type FC } from "react";

const LoadingPage: FC = () => {
  const { client } = useDeskproAppClient()
  const { context } = useDeskproLatestAppContext<UserData, Settings>()

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [isFetchingAuth, setIsFetchingAuth] = useState<boolean>(true)

  const navigate = useNavigate()

  // Determine authentication method from settings
  const isUsingOAuth = context?.settings.use_api_key !== true || context.settings.use_advanced_connect === false
  const user = context?.data?.user

  useDeskproElements(({ registerElement, clearElements }) => {
    clearElements()
    registerElement("refresh", { type: "refresh_button" })
  })

  useInitialisedDeskproAppClient((client) => {
    client.setTitle("Copper")

    if (!context || !context?.settings || !user) {
      return
    }

    // Store the authentication method in the user state
    client.setUserState("isUsingOAuth", isUsingOAuth)

    // Verify authentication status
    // If OAuth2 mode and the user is logged in the request would be make with their stored access token
    // If in API key mode the request would be made with the API key provided in the app setup
    getCurrentUser(client)
      .then((user) => {
        if (user) {
          setIsAuthenticated(true)
        }
      })
      .catch(() => { })
      .finally(() => {
        setIsFetchingAuth(false)
      })
  }, [context, context?.settings])

  if (!client || !user || isFetchingAuth) {
    return (<LoadingSpinner />)
  }

  if (isAuthenticated) {

    tryToLinkAutomatically(client, user)
      .then(() => getEntityListService(client, user.id))
      .then((entityIds) => navigate(entityIds.length > 0 ? "/home" : "/contacts/link"))
      .catch(() => { navigate("/contacts/link") });
  } else if (isUsingOAuth) {
    navigate("/login");
  } else {
    // Show error for invalid API keys (expired or not present)
    return (
      <Stack padding={12}>
        <ErrorBlock text="Invalid API Key" />
      </Stack>
    );
  }
  
  return (
    <LoadingSpinner />
  );
};

export { LoadingPage };
