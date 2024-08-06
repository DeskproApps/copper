import { LoadingSpinner } from "@deskpro/app-sdk";
import { useSetTitle, useRegisterElements } from "@/hooks";
import { useLinkedCompanies } from "./hooks";
import { CompanyHome } from "@/components";
import type { FC } from "react";

const CompanyHomePage: FC = () => {
  const { companies, account, isLoading } = useLinkedCompanies();

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
    />
  );
};

export { CompanyHomePage };
