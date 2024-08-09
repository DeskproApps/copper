import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDeskproAppClient, useDeskproLatestAppContext } from "@deskpro/app-sdk";
import { deleteCompanyEntityService } from "@/services/deskpro";
import { useAsyncError } from "@/hooks";
import type { Company } from "@/services/copper/types";
import type { OrganisationContext } from "@/types";

export type Result = {
  isLoading: boolean;
  unlinkCompany: (company: Company) => void;
};

type UseUnlinkCompany = () => Result;

const useUnlinkCompany: UseUnlinkCompany = () => {
  const navigate = useNavigate();
  const { client } = useDeskproAppClient();
  const { context } = useDeskproLatestAppContext() as { context?: OrganisationContext };
  const { asyncErrorHandler } = useAsyncError();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dpOrgId = context?.data?.organisation?.id;

  const unlinkCompany = useCallback((company: Company) => {
    if (!client || !dpOrgId) {
      return;
    }

    setIsLoading(true);

    return deleteCompanyEntityService(client, dpOrgId, company.id)
      .then(() => navigate("/companies/home"))
      .catch(asyncErrorHandler)
      .finally(() => setIsLoading(false));
  }, [client, dpOrgId, asyncErrorHandler, navigate]);

  return { isLoading, unlinkCompany };
};

export { useUnlinkCompany };
