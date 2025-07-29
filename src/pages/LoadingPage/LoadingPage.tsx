import { handleNavigation } from "./handleNavigation";
import { LoadingSpinner, useDeskproAppClient, useDeskproElements, useDeskproLatestAppContext, useInitialisedDeskproAppClient } from "@deskpro/app-sdk";
import { Settings, UserData } from "@/types";
import { Stack } from "@deskpro/deskpro-ui";
import { useAuthentication } from "@/hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Callout from "@/components/Callout";

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
  const view = context?.data?.organisation ? "organisation" : "user"
  const deskproUser = context?.data?.user
  const deskproOrganisation = context?.data?.organisation

  const { isLoading, isAuthenticated } = useAuthentication({ isUsingOAuth })

  useEffect(() => {
    if (!client || isLoading) {
      return
    }

    if (!isAuthenticated && isUsingOAuth) {
      navigate(`/login`);
      return
    }

    if (isAuthenticated) {
      handleNavigation(client, {
        deskproOrganisation,
        deskproUser,
        navigate,
        view
      })
    }
  }, [client, deskproOrganisation, deskproUser, isAuthenticated, isLoading, isUsingOAuth, navigate, view])

  if (!client || isLoading) {
    return (<LoadingSpinner />)
  }

  // Show error for invalid API keys (expired or not present)
  if (!isAuthenticated && !isUsingOAuth) {
    return (
      <Stack padding={12} style={{ width: "100%" }}>
        <Callout
          style={{ width: "100%" }}
          accent="red"
        >
          The Copper API credentials provided during the app setup process are invalid or expired. Please contact your admin to verify your credentials and try again.
        </Callout>
      </Stack>
    )
  }

  return (
    <LoadingSpinner />
  );
};

