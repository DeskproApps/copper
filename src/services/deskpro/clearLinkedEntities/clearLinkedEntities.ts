import { IDeskproClient } from "@deskpro/app-sdk";
import getEntityList from "../getEntityList";
import deleteEntity from "../deleteEntity";

interface Entity {
  type: "user" | "organisation"
  id: string
}

export default async function clearLinkedEntities(client: IDeskproClient, entity: Readonly<Entity>) {
  const { type, id } = entity

  if (type === "organisation") {
    const linkedCompanyIds = await getEntityList(client, { type: "organisation", organisationId: id })

    await Promise.all(linkedCompanyIds.map(async (companyId) => {
      try {
        await deleteEntity(client, { type: "organisation", organisationId: id, entityKey: companyId })
      }
      catch {
        // eslint-disable-next-line no-console
        console.error("Error deleting association for: ", companyId, ".")
      }
    }))

    return
  }

  const linkedPersonIds = await getEntityList(client, { type: "user", userId: id })

  await Promise.all(linkedPersonIds.map(async (personId) => {
    try {
      await deleteEntity(client, { type: "user", userId: id, entityKey: personId })
    }
    catch {
      // eslint-disable-next-line no-console
      console.error("Error deleting association for: ", personId, ".")
    }
  }))
}