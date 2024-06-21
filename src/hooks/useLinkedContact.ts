import { useMemo } from "react";
import { get } from "lodash";
import {
  useQueryWithClient,
  useDeskproLatestAppContext,
} from "@deskpro/app-sdk";
import { getEntityListService } from "../services/deskpro";
import { useContact } from "./useContact";
import { QueryKey } from "../query";
import type { UserContext } from "../types";
import type { Contact } from "../services/copper/types";
import type { Maybe } from "../types";

type UseLinkedContact = () => {
  isLoading: boolean;
  contact: Maybe<Contact>;
};

const useLinkedContact: UseLinkedContact = () => {
  const { context } = useDeskproLatestAppContext() as { context: UserContext };
  const dpUserId = useMemo(() => get(context, ["data", "user", "id"]), [context]);

  const contactIds = useQueryWithClient(
    [QueryKey.LINKED_CONTACT, dpUserId as string],
    (client) => getEntityListService(client, dpUserId as string),
    { enabled: Boolean(dpUserId) },
  );

  const contactId = useMemo(() => {
    const id = get(contactIds.data, [0]);
    return !id ? null : parseInt(id);
  }, [contactIds.data]);

  const contact = useContact(contactId);

  return {
    isLoading: [contactIds, contact].some(({ isLoading }) => isLoading),
    contact: contact.contact,
  };
};

export { useLinkedContact };


