import { useMemo } from "react";
import { get, map } from "lodash";
import { Title, Property } from "@deskpro/app-sdk";
import { getExternalLinks } from "@/utils";
import { CopperLogo, DPNormalize } from "@/components/common";
import type { FC } from "react";
import type { Contact, Account } from "@/services/copper/types";
import formatAddress from "@/utils/formatAddress";

export type Props = {
  contact: Contact;
  account: Account;
};

const ContactInfo: FC<Props> = ({ contact, account }) => {
  const email = useMemo(() => {
    return map(get(contact, ["emails"]), "email").join(",\n");
  }, [contact]);
  const phone = useMemo(() => {
    return map(get(contact, ["phone_numbers"]), "number").join(`,\n`);
  }, [contact]);
  const link = useMemo(() => {
    return getExternalLinks.contact(account?.id, contact?.id);
  }, [account, contact]);

  return (
    <>
      <Title
        title={get(contact, ["name"])}
        {...(!link ? {} : { icon: <CopperLogo /> })}
        {...(!link ? {} : { link })}
      />
      <Property
        label="Email"
        text={<DPNormalize text={email} />}
      />
      <Property
        label="Phone"
        text={<DPNormalize text={phone} />}
      />
      <Property label="Title" text={contact.title}/>
      <Property label="Owner" text={get(contact, ["assignee_name"])}/>
      <Property label="Company name" text={get(contact, ["company_name"])}/>
      <Property label="Address" text={formatAddress (contact.address)}/>
    </>
  );
};

export { ContactInfo };
