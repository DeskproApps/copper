import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Contact } from "./types";

const createContactService = (
  client: IDeskproClient,
  data: object,
): Promise<Contact> => {
  return baseRequest(client, {
    url: "/people",
    method: "POST",
    data
  });
};

export { createContactService };
