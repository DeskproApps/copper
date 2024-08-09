import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Company, ContactRelated } from "./types";

const getCompanyPeopleService = (
  client: IDeskproClient,
  companyId: Company["id"],
) => {
  return baseRequest<ContactRelated[]>(client, {
    url: `/companies/${companyId}/related/people`,
  });
};

export { getCompanyPeopleService };
