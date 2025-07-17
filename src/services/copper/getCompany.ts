import { baseRequest } from "./baseRequest";
import { Company } from "./types";
import { IDeskproClient } from "@deskpro/app-sdk";

export default async function getCompany(client: IDeskproClient, companyId: string) {

  return await baseRequest<Company>(client, {
    url: `/companies/${companyId}`,
    method: "GET",
  })
}