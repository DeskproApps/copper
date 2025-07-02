import { automaticallyLinkEntity } from "@/services/deskpro";
import { ErrorBlock } from "@/components/common";
import { LoadingSpinner, useDeskproAppClient, useDeskproElements, useDeskproLatestAppContext, useInitialisedDeskproAppClient } from "@deskpro/app-sdk";
import { Settings, UserData } from "@/types";
import { Stack } from "@deskpro/deskpro-ui";
import { useNavigate } from "react-router-dom";
import { useAuthentication } from "@/hooks";

export function LoadingPage(): JSX.Element {
  useDeskproElements(({ registerElement, clearElements }) => {
    clearElements()
    registerElement("refresh", { type: "refresh_button" })
  }, [])

  useInitialisedDeskproAppClient((client) => {
    client.setTitle("Copper")
  }, [])

  const { client } = useDeskproAppClient()
  const { context } = useDeskproLatestAppContext<UserData, Settings>()
  const navigate = useNavigate()

  const isUsingOAuth = context?.settings.use_api_key === false || context?.settings.use_advanced_connect === false;
  const isOrgView = Boolean(context?.data?.organisation)
  const deskproUser = context?.data?.user
  const deskproOrganisation = context?.data?.organisation

  const { isLoading, isAuthenticated } = useAuthentication({ isUsingOAuth })

  if (!client || isLoading) {
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
            navigate(`/companies/link?filter=${encodeURIComponent(deskproOrganisation.name)}`)
            return (<LoadingSpinner />)
          }

          navigate(`/companies`)
          return (<LoadingSpinner />)
        }

        // Navigate to the org link page if nothing is linked and there's no
        // Copper company matching the Deskpro org's name. (Maybe navigate to the create page in the future?)
        navigate("/companies/link")
      })
    return (<LoadingSpinner />)
  }

  if (!deskproUser) {
    return (<LoadingSpinner />)
  }

  // Handle user sidebar linking.
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

