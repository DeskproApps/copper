import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Contact } from "./types";

const updateContactService = (
  client: IDeskproClient,
  contactId: Contact["id"],
  data: object,
) => {
  return baseRequest<Contact>(client, {
    url: `/people/${contactId}`,
    method: "PUT",
    data
  });
};

export { updateContactService };
