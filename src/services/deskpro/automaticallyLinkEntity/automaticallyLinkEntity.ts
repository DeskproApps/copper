import { DeskproOrganisation, DPUser } from "@/types";
import { getCompanies, getPersonByEmailService } from "@/services/copper";
import { IDeskproClient } from "@deskpro/app-sdk";
import getEntityList from "../getEntityList";
import setEntity from "../setEntity";

interface OrganisationEntity {
  type: "organisation",
  organisation: DeskproOrganisation
}

interface UserEntity {
  type: "user"
  user: DPUser
}

type Options = OrganisationEntity | UserEntity

type LinkEntityResult = {
  success: true,
  isMultiple?: boolean
} |
{
  success: false,
  message: string
}

export default async function automaticallyLinkEntity(client: IDeskproClient, options: Options): Promise<LinkEntityResult> {
  const { type } = options

  if (type === "organisation") {
    const linkedOrganisations = await getEntityList(client, { type: "organisation", organisationId: options.organisation.id })

    // Don't attempt auto linking if an organisation is already linked.
    if (linkedOrganisations.length > 0) {
      return {
        success: true
      }
    }

    const companies = await getCompanies(client, { name: options.organisation.name })

    if (!companies.length) {
      return {
        success: false,
        message: "No Copper company with the provided name."
      }
    }

    if (companies.length > 1) {
      return {
        success: true,
        isMultiple: true,
      }
    }

    return {
      success: true
    }
  }

  const linkedContacts = await getEntityList(client, { type: "user", userId: options.user.id })

  // Don't attempt auto linking if a contact is already linked.
  if (linkedContacts.length > 0) {
    return {
      success: true
    }
  }

  const contact = await getPersonByEmailService(client, options.user.primaryEmail)

  if (!contact) {
    return {
      success: false,
      message: "No contact found with the provided email"
    }
  }

  await setEntity(client, { type: "user", userId: options.user.id, entityKey: contact.id.toString() })
  return {
    success: true
  }

}