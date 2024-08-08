import { useMemo, useCallback } from "react";
import { get, map } from "lodash-es";
import { Title, Link } from "@deskpro/app-sdk";
import { getExternalLinks } from "@/utils";
import { CopperLogo, Secondary } from "@/components/common";
import type { FC, MouseEventHandler } from "react";
import type { Maybe } from "@/types";
import type { Account, Contact } from "@/services/copper/types";

export type Props = {
  contact: Contact;
  account: Maybe<Account>;
  onClickTitle?: () => void;
};

const ContactItem: FC<Props> = ({ contact, account, onClickTitle }) => {
  const email = useMemo(() => {
    return map(get(contact, ["emails"]), "email").join(",\n");
  }, [contact]);
  const link = useMemo(() => {
    return getExternalLinks.contact(account?.id, contact?.id);
  }, [account, contact]);
  const onClick: MouseEventHandler<HTMLAnchorElement> = useCallback((e) => {
    e.preventDefault();
    onClickTitle && onClickTitle();
  }, [onClickTitle]);

  return (
    <div style={{ marginBottom: 14 }}>
      <Title
        title={!onClickTitle
          ? `${contact.name}`
          : (<Link href="#" onClick={onClick}>{contact.name}</Link>)
        }
        marginBottom={0}
        {...(!link ? {} : { icon: <CopperLogo />, link })}
      />
      <Secondary type="p5">&lt;{email}&gt;</Secondary>
    </div>
  );
};

export { ContactItem };
