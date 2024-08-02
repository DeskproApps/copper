import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Company } from "./types";

const searchCompaniesService = (client: IDeskproClient, q: string) => {
  return baseRequest<Company[]>(client, {
    url: "/companies/search",
    method: "POST",
    data: { name: q },
  });
};

export { searchCompaniesService };
