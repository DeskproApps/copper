import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Contact, Activity, ActivityInput } from "./types";

const createActivityService = (
  client: IDeskproClient,
  contactId: Contact["id"],
  activity: ActivityInput,
) => {
  return baseRequest<Activity>(client, {
    url: "/activities",
    method: "POST",
    data: {
      parent: { type: "person", id: contactId },
      ...activity,
    },
  });
};

export { createActivityService };
