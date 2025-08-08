import { baseRequest } from "./baseRequest";
import { Activity } from "./types";
import { IDeskproClient } from "@deskpro/app-sdk";

export default async function getCompanyActivities(client: IDeskproClient, companyId: string) {

  return await baseRequest<Activity[]>(client, {
    url: `/companies/${companyId}/activities`,
    method: "POST",
  })
}