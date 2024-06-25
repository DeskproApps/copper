import { ENTITY } from "../../constants";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { DPUser } from "../../types";

const deleteEntityService = (
  client: IDeskproClient,
  userId: DPUser["id"],
  entityId: string,
) => {
  return client
    .getEntityAssociation(ENTITY, userId)
    .delete(entityId);
};

export { deleteEntityService };
