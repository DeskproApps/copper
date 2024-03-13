import { Stack } from "@deskpro/deskpro-ui";
import {
  LoadingSpinner,
  useDeskproLatestAppContext,
  useInitialisedDeskproAppClient,
  useQueryWithClient,
} from "@deskpro/app-sdk";
import {
  getAccount,
  getActivitiesByContactId,
  getContactsByEmail,
  getOpportunitiesByContactId,
} from "../api/api";
import { FieldMapping } from "../components/FieldMapping/FieldMapping";
import contactJson from "../mapping/contact.json";
import activityJson from "../mapping/activity.json";
import noteJson from "../mapping/note.json";
import opportunityJson from "../mapping/opportunity.json";

import { makeFirstLetterUppercase } from "../utils/utils";
import { IActivityNote, IOpportunity } from "../api/types";

export const Main = () => {
  const { context } = useDeskproLatestAppContext();

  useInitialisedDeskproAppClient((client) => {
    client.registerElement("refresh", {
      type: "refresh_button",
    });

    client.deregisterElement("home");
  });

  const contactQuery = useQueryWithClient(
    ["contact", context?.data.user.primaryEmail],
    (client) => getContactsByEmail(client, context?.data.user.primaryEmail),
    {
      enabled: !!context?.data.user.primaryEmail,
    }
  );

  const activitiesNotesQuery = useQueryWithClient(
    ["activity", contactQuery.data?.id as unknown as string],
    (client) =>
      getActivitiesByContactId(
        client,
        contactQuery.data?.id as unknown as string
      ),
    {
      enabled: !!contactQuery.data?.id,
    }
  );

  const opportunitiesQuery = useQueryWithClient(
    ["opportunities", contactQuery.data?.id as unknown as string],
    (client) =>
      getOpportunitiesByContactId(
        client,
        contactQuery.data?.id as unknown as number
      ),
    {
      enabled: !!contactQuery.data?.id,
    }
  );

  const accountQuery = useQueryWithClient(["account"], (client) =>
    getAccount(client)
  );

  if (
    [contactQuery, activitiesNotesQuery, opportunitiesQuery, accountQuery].some(
      (e) => e.isLoading
    )
  )
    return <LoadingSpinner />;

  if (contactQuery.isFetched && !contactQuery.data) {
    return <h1>No contacts found</h1>;
  } else if (!contactQuery.data) {
    return <div></div>;
  }

  const contact = contactQuery.data;

  const activities = activitiesNotesQuery.data?.activities as IActivityNote[];

  const opportunities = opportunitiesQuery.data as IOpportunity[];

  const notes = activitiesNotesQuery.data?.notes as IActivityNote[];

  const account = accountQuery.data;

  return (
    <Stack vertical>
      <FieldMapping
        childTitleAccessor={(field) => field.name}
        idKey={contactJson.idKey}
        externalChildUrl={`${account?.id}/app#/contacts/default/contact/`}
        fields={[contact]}
        metadata={contactJson.main}
      />
      <FieldMapping
        childTitleAccessor={(field) => field.name}
        idKey={opportunityJson.idKey}
        title="Opportunities"
        internalChildUrl="/view/opportunity/"
        externalChildUrl={`${account?.id}/app#/deal/`}
        fields={opportunities}
        metadata={opportunityJson.main}
      />
      <FieldMapping title="Notes" fields={notes} metadata={noteJson.main} />
      <FieldMapping
        title="Activities"
        childTitleAccessor={(field) => makeFirstLetterUppercase(field.details)}
        idKey={activityJson.idKey}
        fields={activities}
        metadata={activityJson.main}
      />
    </Stack>
  );
};
