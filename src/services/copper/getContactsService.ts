import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Contact } from "./types";

type Params = {
  page?: number;
  ids?: Array<Contact["id"]>;
};

const getContactsService = (
  client: IDeskproClient,
  { ids, page }: Params = {},
) => {
  return baseRequest<Contact[]>(client, {
    url: "/people/search",
    method: "POST",
    data: {
      page_size: 10,
      page_number: page || 1,
      ...(ids && { ids }),
    }
  });
};

export { getContactsService };
