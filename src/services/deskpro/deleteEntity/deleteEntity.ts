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

export default async function deleteEntity(client: IDeskproClient, options: Readonly<Options>) {
  const { type, entityKey } = options

  if (type === "organisation") {
    return await client.getEntityAssociation(ENTITY_PLACEHOLDERS.ORGANISATION, options.organisationId).delete(entityKey)
  }

  return await client.getEntityAssociation(ENTITY_PLACEHOLDERS.USER, options.userId).delete(entityKey)
}