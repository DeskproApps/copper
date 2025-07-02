import { baseRequest } from "./baseRequest";
import { IDeskproClient } from "@deskpro/app-sdk";
import { User } from "./types";

export default async function getUserById(client: IDeskproClient, userId: string) {

  return await baseRequest<User>(client, {
    url: `/users/${userId}`,
    method: "GET",
  })
}