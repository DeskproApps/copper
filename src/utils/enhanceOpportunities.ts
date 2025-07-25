import { get, map, find, assign, isEmpty } from "lodash";
import type { Maybe } from "@/types";
import type { Opportunity, Pipeline, User } from "@/services/copper/types";

const enhanceOpportunity = (o: Opportunity, pipelines?: Pipeline[], users?: User[]) => {
  const pipeline = find(pipelines, { id: o.pipeline_id });
  const stage = find(get(pipeline, ["stages"]), { id: o.pipeline_stage_id });
  const assignee = find(users, { id: o.assignee_id });

  return assign({}, o, {
    pipeline_name: get(pipeline, ["name"]),
    pipeline_stage_name: get(stage, ["name"]),
    assignee_name: get(assignee, ["name"]),
  });
};

const enhanceOpportunities = (
  opportunities: Maybe<Opportunity[]>,
  pipelines?: Pipeline[],
  users?: User[],
) => {
  if (isEmpty(opportunities)) {
    return [];
  }

  return map(opportunities, (o) => enhanceOpportunity(o, pipelines, users));
};

export { enhanceOpportunity, enhanceOpportunities };
