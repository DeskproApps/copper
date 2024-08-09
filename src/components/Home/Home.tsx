import { HorizontalDivider } from "@deskpro/app-sdk";
import { Container, NotFound } from "@/components/common";
import { Activities } from "@/components/Activities";
import { ContactInfo, Opportunities, Notes } from "./blocks";
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
  isLoadingActivities: boolean;
  onNextActivitiesPage: () => void;
};

const Home: FC<Props> = ({
  notes,
  contact,
  account,
  activities,
  activityTypes,
  opportunities,
  isLoadingActivities,
  onNextActivitiesPage,
  onNavigateToCreateNote,
  onNavigateToCreateActivity,
  onNavigateToCreateOpportunity,
}) => {
  if (!contact) {
    return (
      <Container>
        <NotFound text="No contacts found"/>
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
          isLoading={isLoadingActivities}
          onNextActivitiesPage={onNextActivitiesPage}
          onNavigateToCreateActivity={onNavigateToCreateActivity}
        />
      </Container>

      <HorizontalDivider />
    </>
  );
};

export { Home };
