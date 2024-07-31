import { map, isEmpty } from "lodash-es";
import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Contact, Opportunity, OpportunityRelated } from "./types";

type Params = {
  contactId?: Contact["id"];
  opportunityIds?: Array<Opportunity["id"]>;
};

const getOpportunitiesService = async (
  client: IDeskproClient,
  { contactId, opportunityIds }: Params,
) => {
  let ids = opportunityIds || [];

  if (contactId) {
    const contactOpportunities = await baseRequest<OpportunityRelated[]>(client, {
      url: `/people/${contactId}/related/opportunities`,
    });
    ids = map(contactOpportunities, "id");
  }

  if (isEmpty(ids)) {
    return [];
  }

  return baseRequest<Opportunity[]>(client, {
    url: "/opportunities/search",
    method: "POST",
    data: { ids },
  });
};

export { getOpportunitiesService };
