import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { PipeLineStage } from "./types";

const getPipelineStagesService = (client: IDeskproClient) => {
  return baseRequest<PipeLineStage[]>(client, {
    url: "/pipeline_stages",
  });
};

export { getPipelineStagesService };
