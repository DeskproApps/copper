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
  const link = getExternalLinks.company(account?.id, company.id);
  const contactLink = getExternalLinks.contact(account?.id, primaryContact?.id);
  const phones = company.phone_numbers?.map(({ number }) => number).join(`,\n`);
  const sites = company.websites?.map(({ url }) => url).join(",\n");;

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
