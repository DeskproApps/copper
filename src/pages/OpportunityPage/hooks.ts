import { enhanceOpportunity } from "@/utils";
import { QueryKey } from "@/query";
import { useMemo } from "react";
import { useQueryWithClient } from "@deskpro/app-sdk";
import { getOpportunityService, getPipelinesService, getPipelineStagesService, getUsersService } from "@/services/copper";
import type { Maybe } from "@/types";
import type { Opportunity } from "../../services/copper/types";

type UseOpportunity = (id?: Opportunity["id"]) => {
  isLoading: boolean;
  opportunity: Maybe<Opportunity>;
};

const useOpportunity: UseOpportunity = (id) => {
  const opportunity = useQueryWithClient(
    [QueryKey.OPPORTUNITY, `${id}`],
    (client) => getOpportunityService(client, id as Opportunity["id"]),
    { enabled: Boolean(id) },
  );

  const users = useQueryWithClient([QueryKey.USERS], getUsersService);

  const pipelines = useQueryWithClient([QueryKey.PIPELINES], getPipelinesService);

  const pipelineStages = useQueryWithClient(
    [QueryKey.PIPELINE_STAGES],
    getPipelineStagesService,
  );

  return {
    isLoading: Boolean(id) && [
      opportunity,
      pipelineStages,
    ].some(({ isLoading }) => isLoading),
    opportunity: useMemo(() => {
      return !opportunity.data ? null : enhanceOpportunity(
        opportunity.data,
        pipelines.data,
        users.data,
      );
    }, [opportunity.data, pipelines.data, users.data]),
  };
};

export { useOpportunity };
