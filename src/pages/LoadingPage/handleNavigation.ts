import { automaticallyLinkEntity } from "@/services/deskpro";
import { DeskproOrganisation, DPUser } from "@/types";
import { IDeskproClient } from "@deskpro/app-sdk";
import { NavigateFunction } from "react-router-dom";

interface HandleNavigationParams {
  view: "organisation" | "user"
  deskproOrganisation?: DeskproOrganisation
  deskproUser?: DPUser
  navigate: NavigateFunction
}

export async function handleNavigation(client: IDeskproClient, params: Readonly<HandleNavigationParams>): Promise<void> {
  const { view, deskproOrganisation, deskproUser, navigate } = params

  if (view === "organisation" && deskproOrganisation) {
    // Try linking the Deskpro organisation to a Copper company with the same name.
    const linkResult = await automaticallyLinkEntity(client, { type: "organisation", organisation: deskproOrganisation })

    if (linkResult.success) {
      // If multiple Copper companies exist with the same name as the Deskpro org, pass the name to the link page so 
      // the user can select the company they want linked.
      if (linkResult.isMultiple) {
        navigate(`/companies/link?filter=${encodeURIComponent(deskproOrganisation.name)}`)
        return
      }

      navigate(`/companies`)
      return
    }

    // Navigate to the org link page if nothing is linked and there's no
    // Copper company matching the Deskpro org's name.
    navigate("/companies/link")
  }


  if (view === "user" && deskproUser) {
    // Try linking the Deskpro user to a Copper contact with the same email.
    const linkResult = await automaticallyLinkEntity(client, { type: "user", user: deskproUser })

    if (linkResult.success) {
      navigate("/home")
      return
    }

    navigate("/contacts/link")

  }

}