import { useQueryWithClient } from "@deskpro/app-sdk";
import { getContactService } from "@/services/copper";
import { QueryKey } from "@/query";
import type { Maybe } from "@/types";
import type { Contact } from "@/services/copper/types";

type UseContact = (contactId: Maybe<Contact["id"]>) => {
  isLoading: boolean;
  contact: Contact;
};

const useContact: UseContact = (contactId) => {
  const contact = useQueryWithClient(
    [QueryKey.CONTACT, `${contactId}`],
    (client) => getContactService(client, contactId as Contact["id"]),
    { enabled: Boolean(contactId) },
  );

  return {
    isLoading: contact.isLoading && Boolean(contactId),
    contact: contact.data as Contact,
  };
};

export { useContact };
