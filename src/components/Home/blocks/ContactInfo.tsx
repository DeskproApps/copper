import { useMemo } from "react";
import { get, map } from "lodash";
import { Title, Property } from "@deskpro/app-sdk";
import { getAddress, getExternalLinks } from "../../../utils";
import { CopperLogo, DPNormalize } from "../../common";
import type { FC } from "react";
import type { IAccount } from "../../../api/types";
import type { Contact } from "../../../services/copper/types";

export type Props = {
  contact: Contact;
  account: IAccount;
};

const ContactInfo: FC<Props> = ({ contact, account }) => {
  const email = useMemo(() => {
    return map(get(contact, ["emails"]), "email").join(",\n");
  }, [contact]);
  const phone = useMemo(() => {
    return map(get(contact, ["phone_numbers"]), "number").join(`,\n`);
  }, [contact]);
  const address = useMemo(() => getAddress(get(contact, ["address"])), [contact]);
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
      <Property label="Address" text={address}/>
    </>
  );
};

export { ContactInfo };
