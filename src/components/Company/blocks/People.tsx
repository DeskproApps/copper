import { P5, Stack, Spinner } from "@deskpro/deskpro-ui";
import { Title } from "@deskpro/app-sdk";
import { NotFound, ButtonAsLink } from "@/components/common";
import { ContactItem } from "@/components/ContactItem";
import type { FC } from "react";
import type { Maybe } from "@/types";
import type { Contact, Account } from "@/services/copper/types";

export type Props = {
  people: Contact[];
  account: Maybe<Account>;
  isLoading: boolean;
  onNextPeoplePage: () => void;
};

const People: FC<Props> = ({
  people,
  account,
  isLoading,
  onNextPeoplePage,
}) => {
  return (
    <>
      <Title title={`People (${people.length || 0})`} />
      {people.length === 0
        ? <NotFound text="No people found." />
        : (
          <>
            {people.map((person) => (
              <ContactItem key={person.id} account={account} contact={person} />
            ))}
            <Stack justify="center" style={{ visibility: isLoading ? "visible" : "hidden" }}>
              <Spinner size="small"/>
            </Stack>
            <P5>
              <ButtonAsLink onClick={onNextPeoplePage}>
                Load next 10 people
              </ButtonAsLink>
            </P5>
          </>
        )
      }
    </>
  );
};

export { People };
