import { ENTITY_PLACEHOLDERS } from "@/constants";
import { IDeskproClient } from "@deskpro/app-sdk";

interface OrganisationEntity {
  type: "organisation"
  organisationId: string
  entityKey: string
}

interface UserEntity {
  type: "user"
  userId: string
  entityKey: string
}

type Options = OrganisationEntity | UserEntity

export default async function setEntity(client: IDeskproClient, options: Readonly<Options>) {
  const { type, entityKey } = options

  if (type === "organisation") {
    return await client.getEntityAssociation(ENTITY_PLACEHOLDERS.ORGANISATION, options.organisationId).set(entityKey)
  }

  return await client.getEntityAssociation(ENTITY_PLACEHOLDERS.USER, options.userId).set(entityKey)
}