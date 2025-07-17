import { COPPER_URL } from "@/constants";
import type { Maybe } from "@/types";
import type { Contact, Account } from "@/services/copper/types";

const getExternalLinks = {
  contact: (accountId?: Account["id"], contactId?: Contact["id"]): Maybe<string> => {
    if (!accountId || !contactId) {
      return null;
    }

    return `${COPPER_URL}/companies/${accountId}/app#/browse/list/people/default?fullProfile=people-${contactId}`;
  },
};

export { getExternalLinks };
