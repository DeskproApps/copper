import { useMemo, useCallback } from "react";
import { Title, Property } from "@deskpro/app-sdk";
import { getExternalLinks, getAddress } from "@/utils";
import { CopperLogo, ButtonAsLink } from "@/components/common";
import type { FC } from "react";
import type { Maybe } from "@/types";
import type { Account, Company } from "@/services/copper/types";

export type Props = {
  company: Company;
  account: Maybe<Account>;
  onClickTitle?: () => void,
};

const CompanyItem: FC<Props> = ({ account, company, onClickTitle }) => {
  const onClick = useCallback(() => {
    onClickTitle && onClickTitle();
  }, [onClickTitle]);
  const link = useMemo(() => {
    return getExternalLinks.company(account?.id, company.id);
  }, [account?.id, company.id]);
  const sites = useMemo(() => {
    return company.websites?.map(({ url }) => url).join(",\n");
  }, [company.websites]);
  const address = useMemo(() => getAddress(company.address), [company]);

  return (
    <>
      <Title
        title={!onClickTitle
          ? company.name
          : (
            <ButtonAsLink type="button" onClick={onClick}>
              {company.name}
            </ButtonAsLink>
          )
        }
        {...(link ? { icon: <CopperLogo />, link } : {})}
        marginBottom={0}
      />
      <Property
        label="Websites"
        text={sites}
      />
      <Property
        label="Address"
        text={address}
      />
    </>
  );
};

export { CompanyItem };
