import { ENTITY_ORG } from "@/constants";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { DPOrganisation } from "@/types";
import type { Company } from "@/services/copper/types";

const setCompanyEntityService = (
  client: IDeskproClient,
  orgId: DPOrganisation["id"],
  entityId: Company["id"],
) => {
  return client
    .getEntityAssociation(ENTITY_ORG, orgId)
    .set(`${entityId}`);
};

export { setCompanyEntityService };
