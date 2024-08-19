import { HorizontalDivider } from "@deskpro/app-sdk";
import {Container, NoFound} from "@/components/common";
import { ContactInfo, Opportunities, Notes, Activities } from "./blocks";
import type { FC } from "react";
import type { Activity, Opportunity, Account, UserActivityType } from "@/services/copper/types";
import type { Contact } from "@/services/copper/types";

type Props = {
  contact: Contact;
  account: Account;
  activities: Activity[];
  notes: Activity[];
  opportunities: Opportunity[];
  activityTypes: UserActivityType[];
  onNavigateToCreateNote: () => void;
  onNavigateToCreateActivity: () => void;
  onNavigateToCreateOpportunity: () => void;
};

const Home: FC<Props> = ({
  notes,
  contact,
  account,
  activities,
  activityTypes,
  opportunities,
  onNavigateToCreateNote,
  onNavigateToCreateActivity,
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
        <Activities
          activities={activities}
          activityTypes={activityTypes}
          onNavigateToCreateActivity={onNavigateToCreateActivity}
        />
      </Container>

      <HorizontalDivider />
    </>
  );
};

export { Home };
