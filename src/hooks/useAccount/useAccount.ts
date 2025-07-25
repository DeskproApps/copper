import { QueryKey } from "@/query";
import { getAccountService } from "@/services/copper";
import { useQueryWithClient } from "@deskpro/app-sdk";

export default function useAccount() {
  const accountResponse = useQueryWithClient([QueryKey.ACCOUNT], getAccountService)

  return {
    account: accountResponse.data ?? null,
    isLoading: accountResponse.isLoading
  }

}