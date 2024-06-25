import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Contact, Activity } from "./types";

const getActivitiesService = (
  client: IDeskproClient,
  contactId: Contact["id"],
) => {
  return baseRequest<Activity[]>(client, {
    url: `/activities/search`,
    method: "POST",
    data: {
      parent: { id: contactId, type: "person" },
    },
  });
};

export { getActivitiesService };
