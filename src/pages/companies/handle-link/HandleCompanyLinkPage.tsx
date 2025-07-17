import { Button, P2, Stack } from "@deskpro/deskpro-ui";
import { getEntityList } from "@/services/deskpro";
import { LoadingSpinner, useDeskproElements, useDeskproLatestAppContext, useInitialisedDeskproAppClient } from "@deskpro/app-sdk";
import { Settings, UserData } from "@/types";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function HandleCompanyLinkPage(): JSX.Element {
  const { context } = useDeskproLatestAppContext<UserData, Settings>()
  const isUsingOAuth = context?.settings.use_api_key === false || context?.settings.use_advanced_connect === false;

  useDeskproElements(({ registerElement, clearElements, deRegisterElement }) => {
    clearElements()
    deRegisterElement("home")
    if (isUsingOAuth) {
      registerElement("menu", {
        type: "menu",
        items: [
          {
            title: "Logout",
            payload: { type: "logout" },
          }
        ],
      })
    }

    registerElement("refresh", { type: "refresh_button" })
  }, [])

  const deskproOrganisation = context?.data?.organisation

  const [companyHasNoLinks, setCompanyHasNoLinks] = useState<boolean>(false)
  const navigate = useNavigate()

  useInitialisedDeskproAppClient((client) => {
    client.setTitle("Copper")
    if (!deskproOrganisation?.id) {
      return
    }

    getEntityList(client, { type: "organisation", organisationId: deskproOrganisation.id })
      .then((linkedCompanyIds) => {
        if (linkedCompanyIds.length > 0) {
          navigate(`/companies/${linkedCompanyIds[0]}`)
          return
        }

        setCompanyHasNoLinks(true)
      })
  }, [deskproOrganisation?.id])

  if (companyHasNoLinks) {
    return (
      <Stack vertical gap={16} padding={12} justify={"center"} align={"center"}>
        <P2>No Copper company is currently linked to this organisation</P2>

        <Button text={"Link a company"} intent={"secondary"} onClick={() => { navigate("/companies/link") }} />

      </Stack>
    )
  }

  return (
    <Stack align="center" justify="center" style={{ width: "100%" }}>
      <LoadingSpinner />
    </Stack>
  )
}