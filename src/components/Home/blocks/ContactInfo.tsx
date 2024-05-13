import { useMemo } from "react";
import { get, map } from "lodash";
import { Title, Property } from "@deskpro/app-sdk";
import { getAddress } from "../../../utils";
import { CopperLogo, DPNormalize } from "../../common";
import type { FC } from "react";
import type { IAccount, IContact } from "../../../api/types";

export type Props = {
  contact: IContact;
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

  return (
    <>
      <Title
        title={get(contact, ["name"])}
        icon={<CopperLogo />}
        link={`https://app.copper.com/companies/${account?.id}/app#/contacts/default/contact/${contact.id}`}
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
      <Property label="Owner" text={contact.assignee_name}/>
      <Property label="Company name" text={contact.company_name}/>
      <Property label="Address" text={address}/>
    </>
  );
};

export { ContactInfo };
