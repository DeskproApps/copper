import { Fragment } from "react";
import { size } from "lodash-es";
import { Radio } from "@deskpro/deskpro-ui";
import { LoadingSpinner } from "@deskpro/app-sdk";
import { Card, NotFound } from "@/components/common";
import { ContactItem } from "./ContactItem";
import type { FC, Dispatch } from "react";
import type { Maybe } from "@/types";
import type { Account, Contact } from "@/services/copper/types";

export type Props = {
  isLoading: boolean;
  account: Maybe<Account>;
  contacts: Maybe<Contact[]>;
  selectedContact: Maybe<Contact>;
  onChangeSelectedContact: Dispatch<Maybe<Contact>>;
};

const Contacts: FC<Props> = ({
  account,
  contacts,
  isLoading,
  selectedContact,
  onChangeSelectedContact,
}) => {
  if (isLoading) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
    <>
      {!Array.isArray(contacts)
        ? <NotFound/>
        : !size(contacts)
          ? <NotFound text="No people found"/>
          : contacts.map((contact) => (
            <Fragment key={contact.id}>
              <Card>
                <Card.Media>
                  <Radio
                    size={12}
                    id={`${contact.id}`}
                    style={{ marginTop: 4 }}
                    checked={contact.id === selectedContact?.id}
                    onChange={() => onChangeSelectedContact(contact)}
                  />
                </Card.Media>
                <Card.Body>
                  <ContactItem
                    account={account}
                    contact={contact}
                    onClickTitle={() => onChangeSelectedContact(contact)}
                  />
                </Card.Body>
              </Card>
            </Fragment>
          ))
      }
    </>
  );
}

export { Contacts };
