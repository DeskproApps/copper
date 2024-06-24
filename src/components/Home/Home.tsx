import { HorizontalDivider } from "@deskpro/app-sdk";
import {Container, NoFound} from "../common";
import { ContactInfo, Opportunities, Notes, Activities } from "./blocks";
import type { FC } from "react";
import type { IActivity, IOpportunity, IAccount, IActivityType } from "../../api/types";
import type { Contact } from "../../services/copper/types";

type Props = {
  contact: Contact;
  account: IAccount;
  activities: IActivity[];
  notes: IActivity[];
  opportunities: IOpportunity[];
  activityTypes: IActivityType[];
  onNavigateToCreateNote: () => void;
  onNavigateToCreateOpportunity: () => void;
};

const Home: FC<Props> = ({
  contact,
  account,
  opportunities,
  notes,
  activities,
  activityTypes,
  onNavigateToCreateNote,
  onNavigateToCreateOpportunity,
}) => {
  if (!contact) {
    return (
      <Container>
        <NoFound text="No contacts found"/>
      </Container>
    );
  }

  return (
    <>
      <Container>
        <ContactInfo contact={contact} account={account}/>
      </Container>

      <HorizontalDivider />

      <Container>
        <Opportunities
          opportunities={opportunities}
          onNavigateToCreateOpportunity={onNavigateToCreateOpportunity}
        />
      </Container>

      <HorizontalDivider />

      <Container>
        <Notes
          notes={notes}
          onNavigateToCreateNote={onNavigateToCreateNote}
        />
      </Container>

      <HorizontalDivider />

      <Container>
        <Activities activities={activities} activityTypes={activityTypes}/>
      </Container>

      <HorizontalDivider />
    </>
  );
};

export { Home };
