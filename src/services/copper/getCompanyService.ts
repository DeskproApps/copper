import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Company } from "./types";

const getCompanyService = (
  client: IDeskproClient,
  companyId: Company["id"],
) => {
  return baseRequest<Company>(client, {
    url: `/companies/${companyId}`,
  });
};

export { getCompanyService };
