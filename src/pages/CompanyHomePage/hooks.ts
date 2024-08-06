import { useMemo } from "react";
import { useQueryWithClient } from "@deskpro/app-sdk";
import { getCompanyListService } from "@/services/deskpro";
import { getAccountService, getCompaniesService } from "@/services/copper";
import { useDPContext } from "@/hooks";
import { QueryKey } from "@/query";
import type { Maybe, DPOrganisation } from "@/types";
import type { Account, Company } from "@/services/copper/types";

type UseLinkedCompanies = () => {
  isLoading: boolean;
  account: Maybe<Account>;
  companies: Company[];
};

const useLinkedCompanies: UseLinkedCompanies = () => {
  const { dpOrg } = useDPContext();

  const account = useQueryWithClient([QueryKey.ACCOUNT], getAccountService);

  const linkedOrgIds = useQueryWithClient(
    [QueryKey.LINKED_COMPANIES, dpOrg?.id as DPOrganisation["id"]],
    (client) => getCompanyListService(client, dpOrg?.id as DPOrganisation["id"]),
    { enabled: Boolean(dpOrg?.id) },
  );

  const orgIds = useMemo(() => {
    return Array.isArray(linkedOrgIds.data) ? linkedOrgIds.data : [];
  }, [linkedOrgIds.data]);

  const companies = useQueryWithClient(
    [QueryKey.COMPANIES, ...orgIds],
    (client) => getCompaniesService(client, {
      ids: orgIds.map((id) => parseInt(id)),
    }),
    { enabled: orgIds.length > 0 },
  );

  return {
    isLoading: [account, linkedOrgIds, companies].some(({ isLoading }) => isLoading),
    account: account.data,
    companies: companies.data || [],
  };
};

export { useLinkedCompanies };
