import { IDeskproClient } from "@deskpro/app-sdk";
import { ENTITY_PLACEHOLDERS } from "@/constants";

type GetEntityListParams = {
  type: "user"
  userId: string
} |
{
  type: "organisation"
  organisationId: string
}

export default async function getEntityList(client: IDeskproClient, params: Readonly<GetEntityListParams>) {
  const { type } = params

  if (type === "organisation") {
    return await client
      .getEntityAssociation(ENTITY_PLACEHOLDERS.ORGANISATION, params.organisationId)
      .list()
  }

  return await client
    .getEntityAssociation(ENTITY_PLACEHOLDERS.USER, params.userId)
    .list()
}
