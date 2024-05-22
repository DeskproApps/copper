import { useMemo } from "react";
import { get } from "lodash";
import {
  useQueryWithClient,
  useDeskproLatestAppContext,
} from "@deskpro/app-sdk";
import { getEntityListService } from "../services/deskpro";
import { getContactService } from "../services/copper";
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

  const contactId = useMemo(() => get(contactIds.data, [0]), [contactIds.data]) as string;

  const contact = useQueryWithClient(
    [QueryKey.CONTACT, `${contactId}`],
    (client) => getContactService(client, parseInt(contactId)),
    { enabled: Boolean(contactId) },
  );

  return {
    isLoading: [contactIds, contact].some(({ isLoading }) => isLoading),
    contact: contact.data,
  };
};

export { useLinkedContact };


