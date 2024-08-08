import { useMemo } from "react";
import { Stack } from "@deskpro/deskpro-ui";
import { Title, Property, Member, LinkIcon } from "@deskpro/app-sdk";
import { getAddress, getExternalLinks } from "@/utils";
import { CopperLogo, DPNormalize } from "@/components/common";
import type { FC } from "react";
import type { Maybe } from "@/types";
import type { Company, Account, Contact } from "@/services/copper/types";

export type Props = {
  company: Company;
  account: Maybe<Account>;
  primaryContact: Maybe<Contact>;
};

const Details: FC<Props> = ({ company, account, primaryContact }) => {
  const link = useMemo(() => {
    return getExternalLinks.company(account?.id, company.id);
  }, [account?.id, company.id]);
  const contactLink = useMemo(() => {
    return getExternalLinks.contact(account?.id, primaryContact?.id);
  }, [account?.id, primaryContact?.id]);
  const phones = useMemo(() => {
    return company.phone_numbers?.map(({ number }) => number).join(`,\n`);
  }, [company.phone_numbers]);
  const sites = useMemo(() => {
    return company.websites?.map(({ url }) => url).join(",\n");
  }, [company.websites]);

  const address = useMemo(() => getAddress(company.address), [company]);

  return (
    <>
      <Title
        title={company.name}
        {...(link ? { icon: <CopperLogo />, link } : {})}
      />
      <Property label="Websites" text={sites} />
      <Property label="Email Domain" text={company.email_domain} />
      <Property label="Phone numbers" text={phones} />
      <Property label="Address" text={address} />
      <Property
        label="Primary Contact"
        text={primaryContact?.name && (
          <Stack gap={8} align="baseline">
            <Member name={primaryContact.name} />
            {contactLink && (
              <LinkIcon href={contactLink}/>
            )}
          </Stack>
        )}
      />
      <Property
        label="Description"
        text={<DPNormalize text={company.details ?? ""} />}
      />
    </>
  );
};

export { Details };
