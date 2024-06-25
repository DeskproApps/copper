import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import { ActivityTypes } from "./types";

const getActivityTypesService = (
  client: IDeskproClient
) => {
  return baseRequest<ActivityTypes>(client, {
    url: "/activity_types"
  });
};

export { getActivityTypesService };
