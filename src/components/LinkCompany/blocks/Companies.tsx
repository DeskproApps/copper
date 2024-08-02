import { Checkbox } from "@deskpro/deskpro-ui";
import { LoadingSpinner, HorizontalDivider } from "@deskpro/app-sdk";
import { Card, NotFound } from "@/components/common";
import { CompanyItem } from "@/components/CompanyItem";
import { Fragment, type FC } from "react";
import type { Maybe } from "@/types";
import type { Account, Company } from "@/services/copper/types";

export type Props = {
  isLoading: boolean;
  companies: Company[];
  account: Maybe<Account>;
  selectedCompanies: Company[];
  onChangeSelectedCompanies: (company: Company) => void;
};

const Companies: FC<Props> = ({
  account,
  isLoading,
  companies,
  selectedCompanies,
  onChangeSelectedCompanies,
}) => {
  if (isLoading) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
    <>
      {!companies.length
        ? <NotFound text="No companies found"/>
        : companies.map((company) => (
          <Fragment key={company.id}>
            <Card>
              <Card.Media>
                <Checkbox
                  size={12}
                  containerStyle={{ marginTop: 4 }}
                  onChange={() => onChangeSelectedCompanies(company)}
                  checked={selectedCompanies.some((selectedCompany) => {
                    return company.id === selectedCompany.id;
                  })}
                />
              </Card.Media>
              <Card.Body>
                <CompanyItem
                  account={account}
                  company={company}
                  onClickTitle={() => onChangeSelectedCompanies(company)}
                />
              </Card.Body>
            </Card>
            <HorizontalDivider/>
          </Fragment>
        ))
      }
    </>
  );
};

export { Companies };
