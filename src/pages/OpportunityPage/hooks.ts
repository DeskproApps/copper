import { useQueryWithClient } from "@deskpro/app-sdk";
import { getOpportunityById } from "../../api/api";
import type { Maybe } from "../../types";
import type { IOpportunity } from "../../api/types";

type UseOpportunity = (id?: IOpportunity["id"]) => {
  isLoading: boolean;
  opportunity: Maybe<IOpportunity>;
};

const useOpportunity: UseOpportunity = (id) => {
  const opportunity = useQueryWithClient(
    ["opportunity", `${id}`],
    (client) => getOpportunityById(client, id as IOpportunity["id"]),
    { enabled: Boolean(id) },
  );

  return {
    isLoading: Boolean(id) && [opportunity].some(({ isLoading }) => isLoading),
    opportunity: opportunity.data || null,
  };
};

export { useOpportunity };
