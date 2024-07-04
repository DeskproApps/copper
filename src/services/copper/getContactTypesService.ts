import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { ContactType } from "./types";

const getContactTypesService = (
  client: IDeskproClient,
): Promise<ContactType[]> => {
  return baseRequest(client, {
    url: "/contact_types",
  });
};

export { getContactTypesService };
