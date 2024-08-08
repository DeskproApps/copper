import { HorizontalDivider } from "@deskpro/app-sdk";
import { Container } from "@/components/common";
import { Activities } from "@/components/Activities";
import { Details, People } from "./blocks";
import type { FC } from "react";
import type { Maybe } from "@/types";
import type {
  Account,
  Contact,
  Activity,
  UserActivityType,
  Company as CompanyType,
} from "@/services/copper/types";

export type Props = {
  company: CompanyType;
  account: Maybe<Account>;
  primaryContact: Maybe<Contact>;
  people: Contact[];
  isLoadingPeople: boolean;
  activities: Activity[];
  isLoadingActivities: boolean;
  onNextPeoplePage: () => void;
  onNextActivitiesPage: () => void;
  activityTypes: UserActivityType[];
};

const Company: FC<Props> = ({
  people,
  account,
  company,
  activities,
  activityTypes,
  primaryContact,
  isLoadingPeople,
  onNextPeoplePage,
  isLoadingActivities,
  onNextActivitiesPage,
}) => {
  return (
    <>
      <Container>
        <Details
          company={company}
          account={account}
          primaryContact={primaryContact}
        />
      </Container>
      <HorizontalDivider/>
      <Container>
        <People
          people={people}
          account={account}
          isLoading={isLoadingPeople}
          onNextPeoplePage={onNextPeoplePage}
        />
      </Container>
      <HorizontalDivider/>
      <Container>
        <Activities
          activities={activities}
          activityTypes={activityTypes}
          isLoading={isLoadingActivities}
          onNextActivitiesPage={onNextActivitiesPage}
        />
      </Container>
    </>
  );
};

export { Company };
