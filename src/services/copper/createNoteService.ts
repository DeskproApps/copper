import { baseRequest } from "./baseRequest";
import { IDeskproClient } from "@deskpro/app-sdk";
import { Contact } from "./types";

const createNoteService = (
  client: IDeskproClient,
  contactId: Contact["id"],
  { note }: { note: string },
) => {
  return baseRequest(client, {
    url: "/activities",
    method: "POST",
    data: {
      parent: { type: "person", id: contactId },
      type: { category: "user", id: 0 }, // zero is activity type - note
      details: note,
    },
  });
};

export { createNoteService };
