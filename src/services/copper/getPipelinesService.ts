import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Pipeline } from "./types";

const getPipelinesService = (
  client: IDeskproClient,
) => {
  return baseRequest<Pipeline[]>(client, {
    url: "/pipelines",
  });
};

export { getPipelinesService };
