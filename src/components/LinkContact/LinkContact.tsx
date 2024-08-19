import { Search, HorizontalDivider } from "@deskpro/app-sdk";
import { Container, Navigation } from "@/components/common";
import { Buttons, Contacts } from "./blocks";
import type { FC, Dispatch } from "react";
import type { Maybe } from "@/types";
import type { Account, Contact } from "@/services/copper/types";

type Props = {
  isLoading: boolean;
  contacts: Contact[];
  onCancel: () => void;
  isSubmitting: boolean;
  account: Maybe<Account>;
  onLinkContact: () => void;
  onNavigateToCreate: () => void;
  selectedContact: Maybe<Contact>;
  onChangeSearch: (search: string) => void;
  onChangeSelectedContact: Dispatch<Maybe<Contact>>;
};

const LinkContact: FC<Props> = ({
  account,
  onCancel,
  contacts,
  isLoading,
  isSubmitting,
  onLinkContact,
  onChangeSearch,
  selectedContact,
  onNavigateToCreate,
  onChangeSelectedContact,
}) => {
  return (
    <>
      <Container>
        <Navigation onNavigateToCreate={onNavigateToCreate}/>
        <Search
          isFetching={isLoading}
          onChange={onChangeSearch}
          inputProps={{ placeholder: "Enter email (exact match)" }}
        />
        <Buttons
          isSubmitting={isSubmitting}
          onCancel={onCancel}
          selectedContact={selectedContact}
          onLinkContact={onLinkContact}
        />
      </Container>
      <HorizontalDivider/>
      <Container>
        <Contacts
          account={account}
          contacts={contacts}
          isLoading={isLoading}
          selectedContact={selectedContact}
          onChangeSelectedContact={onChangeSelectedContact}
        />
      </Container>
    </>
  );
};

export { LinkContact };
