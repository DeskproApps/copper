import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "@deskpro/app-sdk";
import { useSetTitle, useRegisterElements } from "@/hooks";
import { useLinkedCompanies } from "./hooks";
import { CompanyHome } from "@/components";
import type { FC } from "react";
import type { Company } from "@/services/copper/types";

const CompanyHomePage: FC = () => {
  const navigate = useNavigate();
  const { companies, account, isLoading } = useLinkedCompanies();

  const onNavigateToCompany = useCallback((companyId: Company["id"]) => {
    navigate(`/companies/${companyId}`);
  }, [navigate]);

  useSetTitle();

  useRegisterElements(({ registerElement }) => {
    registerElement("plus", {
      type: "plus_button",
      payload: { type: "changePage", path: "/companies/link" },
    });
  });

  if (isLoading) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
    <CompanyHome
      account={account}
      companies={companies}
      onNavigateToCompany={onNavigateToCompany}
    />
  );
};

export { CompanyHomePage };
