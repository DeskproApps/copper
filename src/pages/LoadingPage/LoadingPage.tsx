import { ErrorBlock } from "@/components/common";
import { getCurrentUser } from "@/services/copper";
import { LoadingSpinner, useDeskproAppClient, useDeskproElements, useDeskproLatestAppContext, useInitialisedDeskproAppClient } from "@deskpro/app-sdk";
import { Settings, UserData } from "@/types";
import { Stack } from "@deskpro/deskpro-ui";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { automaticallyLinkEntity } from "@/services/deskpro";

export function LoadingPage(): JSX.Element {
  const { client } = useDeskproAppClient()
  const { context } = useDeskproLatestAppContext<UserData, Settings>()

  const isOrgView = Boolean(context?.data?.organisation)

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [isFetchingAuth, setIsFetchingAuth] = useState<boolean>(true)

  const navigate = useNavigate()

  const isUsingOAuth = context?.settings.use_api_key === false || context?.settings.use_advanced_connect === false;
  const deskproUser = context?.data?.user
  const deskproOrganisation = context?.data?.organisation

  useDeskproElements(({ registerElement, clearElements }) => {
    clearElements()
    registerElement("refresh", { type: "refresh_button" })
  })

  useInitialisedDeskproAppClient((client) => {
    client.setTitle("Copper")

    if (!context || !context?.settings) {
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

  if (!client || isFetchingAuth) {
    return (<LoadingSpinner />)
  }

  // Handle unauthenticated states.
  if (!isAuthenticated) {
    if (isUsingOAuth) {
      navigate(`/login`);
      return (<LoadingSpinner />)
    }

    // Show error for invalid API keys (expired or not present)
    return (
      <Stack padding={12}>
        <ErrorBlock text="Invalid API Key" />
      </Stack>
    )
  }

  // Handle organisation sidebar linking.
  if (isOrgView) {

    if (!deskproOrganisation) {
      return (<LoadingSpinner />)
    }
    automaticallyLinkEntity(client, { type: "organisation", organisation: deskproOrganisation })
      .then((result) => {
        if (result.success) {
          if (result.isMultiple) {
            navigate(`/organisations/link?filter=${encodeURIComponent(deskproOrganisation.name)}`)
            return
          }

          navigate(`/organisations`)
          return (<LoadingSpinner />)
        }

        // Navigate to the org link page (Maybe the create page in the future?)
        navigate("/organisations/link")
      })
    return (<LoadingSpinner />)
  }

  if (!deskproUser) {
    return (<LoadingSpinner />)
  }

  // Handle user sidebar linking (can also be used for the ticket sidebar).
  automaticallyLinkEntity(client, { type: "user", user: deskproUser })
    .then((result) => {
      if (result.success) {
        navigate("/home")
        return
      }
      navigate("/contacts/link")
    })

  return (
    <LoadingSpinner />
  );
};

