import { baseRequest } from "./baseRequest";
import { Contact } from "./types";
import { IDeskproClient } from "@deskpro/app-sdk";

export default async function getPersonById(client: IDeskproClient, personId: string) {
  return await baseRequest<Contact>(client, {
    url: `/people/${personId}`,
    method: "GET",
  })
}