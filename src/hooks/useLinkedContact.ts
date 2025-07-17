import { getEntityList } from "@/services/deskpro";
import { QueryKey } from "@/query";
import { useContact } from "./useContact";
import { useMemo } from "react";
import { useQueryWithClient, useDeskproLatestAppContext } from "@deskpro/app-sdk";
import { UserData } from "../types";
import type { Contact } from "@/services/copper/types";
import type { Maybe, Settings } from "@/types";

type UseLinkedContact = () => {
  isLoading: boolean;
  contact: Maybe<Contact>;
};

const useLinkedContact: UseLinkedContact = () => {
  const { context } = useDeskproLatestAppContext<UserData, Settings>()
  const dpUserId = context?.data?.user?.id;

  const contactIds = useQueryWithClient(
    [QueryKey.LINKED_CONTACT, dpUserId ?? ""],
    async (client) => {
      if (!dpUserId) {
        return []
      }

      return getEntityList(client, { type: "user", userId: dpUserId })
    },
    { enabled: Boolean(dpUserId) },
  );

  const contactId = useMemo(() => {
    const id = contactIds.data?.[0]
    return !id ? null : parseInt(id);
  }, [contactIds.data]);

  const contact = useContact(contactId);

  return {
    isLoading: [contactIds, contact].some(({ isLoading }) => isLoading),
    contact: contact.contact,
  };
};

export { useLinkedContact };


