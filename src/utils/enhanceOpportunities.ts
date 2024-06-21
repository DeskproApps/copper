import { get, map, find, assign, isEmpty } from "lodash";
import type { Maybe } from "../types";
import type { Opportunity, Pipeline } from "../services/copper/types";

const enhanceOpportunities = (
  opportunities: Maybe<Opportunity[]>,
  pipelines?: Pipeline[],
) => {
  if (isEmpty(opportunities)) {
    return [];
  }


  return map(opportunities, (o) => {
    const pipeline = find(pipelines, { id: o.pipeline_id });
    const stage = find(get(pipeline, ["stages"]), { id: o.pipeline_stage_id });

    return assign({}, o, {
      pipeline_name: get(pipeline, ["name"]),
      pipeline_stage_name: get(stage, ["name"]),
    });
  });
};

export { enhanceOpportunities };
