import { useMemo } from "react";
import { useQueryWithClient } from "@deskpro/app-sdk";
import { getPersonByEmailService, getAccountService } from "../../services/copper";
import { QueryKey } from "../../query";
import type { Account, Contact } from "../../services/copper/types";
import type { Maybe } from "../../types";

export type Result = {
  isLoading: boolean;
  account: Maybe<Account>;
  contacts: Contact[];
};

type Hooks = (q?: string) => Result;

const useSearch: Hooks = (q) => {
  const account = useQueryWithClient([QueryKey.ACCOUNT], getAccountService);

  const contacts = useQueryWithClient(
    [QueryKey.SEARCH, q as string],
    (client) => getPersonByEmailService(client, q as string),
    { enabled: Boolean(q) },
  );

  const contact = useMemo(() => contacts?.data || null, [contacts?.data]);

  return {
    isLoading: Boolean(q) && [contacts, account].some(({ isLoading }) => isLoading),
    account: account.data,
    contacts: contact ? [contact] : [],
  };
};

export { useSearch };
