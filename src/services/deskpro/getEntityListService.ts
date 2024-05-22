import { IDeskproClient } from "@deskpro/app-sdk";
import { ENTITY } from "../../constants";
import type { DPUser } from "../../types";

const getEntityListService = (
  client: IDeskproClient,
  userId: DPUser["id"],
): Promise<string[]> => {
  return client
    .getEntityAssociation(ENTITY, userId)
    .list();
};

export { getEntityListService };
