import { IDeskproClient } from "@deskpro/app-sdk";
import { baseRequest } from "./baseRequest";
import { Company } from "./types";

interface FilterOptions {
  pageNumber?: number
  sortDirection?: "asc" | "desc"
  perPage?: number,
  name?: string
}

export default async function getCompanies(client: IDeskproClient, filterOptions: Readonly<FilterOptions>) {
  const { pageNumber = 1, sortDirection = "asc", perPage = 200, name } = filterOptions

  return await baseRequest<Company[]>(client, {
    url: `/companies/search`,
    method: "POST",
    data: {
      page_number: pageNumber,
      page_size: perPage,
      sort_direction: sortDirection,
      name
    },
  })
}