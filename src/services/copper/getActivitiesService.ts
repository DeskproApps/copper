import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Contact, Activity, UserActivityType } from "./types";

type Params = {
  page?: number;
  types?: Array<Pick<UserActivityType, "id"|"category">>;
};

const getActivitiesService = (
  client: IDeskproClient,
  contactId: Contact["id"],
  { types, page }: Params = {},
) => {
  return baseRequest<Activity[]>(client, {
    url: `/activities/search`,
    method: "POST",
    data: {
      page_size: 10,
      page_number: page || 1,
      parent: { id: contactId, type: "person" },
      ...(types ? { activity_types: types } : {}),
    },
  });
};

export { getActivitiesService };
