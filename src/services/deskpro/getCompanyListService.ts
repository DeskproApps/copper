import { IDeskproClient } from "@deskpro/app-sdk";
import { ENTITY_ORG } from "@/constants";
import type { DPOrganisation } from "@/types";

const getCompanyListService = (
  client: IDeskproClient,
  orgId: DPOrganisation["id"],
): Promise<string[]> => {
  return client
    .getEntityAssociation(ENTITY_ORG, orgId)
    .list();
};

export { getCompanyListService };
