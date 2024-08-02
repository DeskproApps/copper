import { Search, HorizontalDivider } from "@deskpro/app-sdk";
import { Container } from "@/components/common";
import { Buttons, Companies } from "./blocks";
import type { FC } from "react";
import type { Maybe } from "@/types";
import type { Account, Company } from "@/services/copper/types";

type Props = {
  isLoading: boolean;
  onCancel: () => void;
  companies: Company[];
  isSubmitting: boolean;
  account: Maybe<Account>;
  selectedCompanies: Company[];
  onLinkCompanies: () => void;
  onChangeSearch: (search: string) => void;
  onChangeSelectedCompanies: (company: Company) => void;
};

const LinkCompany: FC<Props> = ({
  account,
  onCancel,
  isLoading,
  companies,
  isSubmitting,
  onChangeSearch,
  onLinkCompanies,
  selectedCompanies,
  onChangeSelectedCompanies,
}) => {
  return (
    <>
      <Container>
        <Search
          isFetching={isLoading}
          onChange={onChangeSearch}
          inputProps={{ placeholder: "Enter company name (exact match)" }}
        />
        <Buttons
          onCancel={onCancel}
          isSubmitting={isSubmitting}
          onLinkCompanies={onLinkCompanies}
          selectedCompanies={selectedCompanies}
        />
      </Container>
      <HorizontalDivider/>
      <Container>
        <Companies
          account={account}
          isLoading={isLoading}
          companies={companies}
          onChangeSelectedCompanies={onChangeSelectedCompanies}
          selectedCompanies={selectedCompanies}
        />
      </Container>
    </>
  );
};

export { LinkCompany };
