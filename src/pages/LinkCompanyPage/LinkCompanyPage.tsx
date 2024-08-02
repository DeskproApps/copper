import { useState, useCallback } from "react";
import { cloneDeep } from "lodash-es";
import { useNavigate } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";
import { useDeskproAppClient } from "@deskpro/app-sdk";
import { setCompanyEntityService } from "@/services/deskpro";
import { useAsyncError, useDPContext, useSetTitle, useRegisterElements } from "@/hooks";
import { LinkCompany } from "@/components";
import { useSearchOrg } from "./hooks";
import type { FC } from "react";
import type { Company } from "@/services/copper/types";

const LinkCompanyPage: FC = () => {
  const navigate = useNavigate();
  const { client } = useDeskproAppClient();
  const { dpOrg } = useDPContext();
  const { asyncErrorHandler } = useAsyncError();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [selectedCompanies, setSelectedCompanies] = useState<Company[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { account, companies, isLoading } = useSearchOrg(searchQuery);

  const onChangeSearch = useDebouncedCallback(setSearchQuery, 1000);

  const onCancel = useCallback(() => navigate("/home"), [navigate]);

  const onChangeSelectedCompanies = useCallback((company: Company) => {
    let newSelectedCompanies = cloneDeep(selectedCompanies);

    if (selectedCompanies.some((selectedCompany) => company.id === selectedCompany.id)) {
      newSelectedCompanies = selectedCompanies.filter((selectedCompany) => {
        return selectedCompany.id !== company.id;
      });
    } else {
      newSelectedCompanies.push(company);
    }

    setSelectedCompanies(newSelectedCompanies);
  }, [selectedCompanies]);

  const onLinkCompanies = useCallback(() => {
    if (!client || !dpOrg?.id || selectedCompanies.length === 0) {
      return;
    }

    setIsSubmitting(true);

    return Promise.all([
      ...selectedCompanies.map((c) => {
        return setCompanyEntityService(client, dpOrg.id, c.id);
      })
    ])
    .then(() => navigate("/companies/home"))
    .catch(asyncErrorHandler)
    .finally(() => setIsSubmitting(false));
  }, [client, navigate, dpOrg, selectedCompanies, asyncErrorHandler]);

  useSetTitle();

  useRegisterElements(({ registerElement }) => {
    registerElement("home", {
      type: "home_button",
      payload: { type: "changePage", path: "/companies/home" },
    });
  });

  return (
    <LinkCompany
      account={account}
      onCancel={onCancel}
      companies={companies}
      isLoading={isLoading}
      isSubmitting={isSubmitting}
      onChangeSearch={onChangeSearch}
      onLinkCompanies={onLinkCompanies}
      selectedCompanies={selectedCompanies}
      onChangeSelectedCompanies={onChangeSelectedCompanies}
    />
  );
};

export { LinkCompanyPage };
