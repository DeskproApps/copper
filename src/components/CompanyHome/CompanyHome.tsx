import { Fragment } from "react";
import { HorizontalDivider } from "@deskpro/app-sdk";
import { Container, NotFound } from "@/components/common";
import { CompanyItem } from "@/components/CompanyItem";
import type { FC } from "react";
import type { Maybe } from "@/types";
import type { Account, Company } from "@/services/copper/types";

export type Props = {
  account: Maybe<Account>;
  companies: Company[];
};

const CompanyHome: FC<Props> = ({ account, companies }) => {
  return (
    <Container>
      {!companies.length
        ? <NotFound text="No companies found"/>
        : companies.map((company) => (
          <Fragment key={company.id}>
            <CompanyItem account={account} company={company} />
            <HorizontalDivider style={{ marginBottom: 8 }} />
          </Fragment>
        ))
      }
    </Container>
  );
};

export { CompanyHome };