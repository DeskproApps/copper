import { useMemo } from "react";
import { get, find } from "lodash";
import { useQueryWithClient } from "@deskpro/app-sdk";
import { getPipelinesService } from "../../services/copper";
import { QueryKey } from "../../query";
import { getOptions } from "../../utils";
import type { Maybe, Option } from "../../types";
import type { Pipeline, PipeLineStage } from "../../services/copper/types";

type UseFormDeps = (pipelineId?: Maybe<Pipeline["id"]>) => {
  isLoading: boolean;
  pipelineOptions: Array<Option<Pipeline["id"]>>;
  stageOptions: Array<Option<PipeLineStage["id"]>>;
};

const useFormDeps: UseFormDeps = (pipelineId) => {
  const pipelines = useQueryWithClient([QueryKey.PIPELINES], getPipelinesService);

  const pipelineStages = useMemo(() => {
    const pipeline = find(pipelines.data, { id: pipelineId });
    return get(pipeline, ["stages"]) || [];
  }, [pipelines.data, pipelineId]);

  return {
    isLoading: [pipelines].some(({ isLoading }) => isLoading),
    pipelineOptions: useMemo(() => getOptions(pipelines.data), [pipelines.data]),
    stageOptions: useMemo(() => getOptions(pipelineStages), [pipelineStages]),
  };
};

export { useFormDeps };
