import { ENTITY } from "../../constants";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { DPUser } from "../../types";

const setEntityService = (
  client: IDeskproClient,
  userId: DPUser["id"],
  entityId: string,
) => {
  return client
    .getEntityAssociation(ENTITY, userId)
    .set(entityId);
};

export { setEntityService };
