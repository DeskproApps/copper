import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Opportunity } from "./types";

const getOpportunityService = (
  client: IDeskproClient,
  id: Opportunity["id"],
) => {
  return baseRequest<Opportunity>(client, {
    url: `/opportunities/${id}`,
  });
};

export { getOpportunityService };
