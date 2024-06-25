import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Contact } from "./types";

const getPersonByEmailService = (client: IDeskproClient, email: string) => {
  return baseRequest<Contact>(client, {
    url: "/people/fetch_by_email",
    method: "POST",
    data: { email },
  }).catch(() => null);
};

export { getPersonByEmailService };
