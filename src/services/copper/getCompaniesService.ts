import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Company } from "./types";

type Params = {
  q?: string;
  ids?: Array<Company["id"]>;
};

const getCompaniesService = (
  client: IDeskproClient,
  { q, ids }: Params = {},
) => {
  const data = {
    ...(q && { name: q }),
    ...(ids && { ids }),
  };

  return baseRequest<Company[]>(client, {
    url: "/companies/search",
    method: "POST",
    data,
  });
};

export { getCompaniesService };
