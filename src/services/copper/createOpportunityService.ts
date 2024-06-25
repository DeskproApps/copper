import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Opportunity, OpportunityInput } from "./types";

const createOpportunityService = (
  client: IDeskproClient,
  data: OpportunityInput
) => {
  return baseRequest<Opportunity>(client, {
    url: "/opportunities",
    method: "POST",
    data,
  });
};

export { createOpportunityService };
