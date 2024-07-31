import { useQueryWithClient } from "@deskpro/app-sdk";
import { getAccountService, searchCompaniesService } from "@/services/copper";
import { QueryKey } from "@/query";
import type { Maybe } from "@/types";
import type { Company, Account } from "@/services/copper/types";

export type Result = {
  isLoading: boolean;
  companies: Company[];
  account: Maybe<Account>;
};

type UseSearchOrg = (q?: string) => Result;

const useSearchOrg: UseSearchOrg = (q) => {
  const account = useQueryWithClient([QueryKey.ACCOUNT], getAccountService);

  const companies = useQueryWithClient(
    [QueryKey.COMPANIES, q as string],
    (client) => searchCompaniesService(client, q as string),
    { enabled: Boolean(q) },
  );

  return {
    isLoading: Boolean(q) && companies.isLoading,
    account: account.data,
    companies: Array.isArray(companies.data) ? companies.data : [],
  };
};

export { useSearchOrg };
