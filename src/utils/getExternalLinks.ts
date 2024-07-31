import { COPPER_URL } from "@/constants";
import type { Maybe } from "@/types";
import type { Contact, Account, Company } from "@/services/copper/types";

const getExternalLinks = {
  contact: (accountId?: Account["id"], contactId?: Contact["id"]): Maybe<string> => {
    if (!accountId || !contactId) {
      return null;
    }

    return `${COPPER_URL}/companies/${accountId}/app#/browse/list/people/default?fullProfile=people-${contactId}`;
  },
  company: (accountId?: Account["id"], companyId?: Company["id"]): Maybe<string> => {
    if (!accountId || !companyId) {
      return null;
    }

    return `${COPPER_URL}/companies/${accountId}/app#/browse/list/companies/default?fullProfile=companies-${companyId}`;
  }
};

export { getExternalLinks };
