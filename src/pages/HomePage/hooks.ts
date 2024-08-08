import { useMemo, useState } from "react";
import { pick } from "lodash-es";
import { useQueryWithClient } from "@deskpro/app-sdk";
import {
  getAccountService,
  getPipelinesService,
  getActivitiesService,
  getActivityTypesService,
  getOpportunitiesService,
} from "@/services/copper";
import { useLinkedContact } from "@/hooks";
import { QueryKey } from "@/query";
import { enhanceOpportunities } from "@/utils";
import type {
  Account,
  Contact,
  Activity,
  Opportunity,
  UserActivityType,
} from "@/services/copper/types";

type UseContact = (activitiesPage: number) => {
  isLoading: boolean;
  contact: Contact;
  account: Account;
  activities: Activity[];
  notes: Activity[];
  isLoadingActivities: boolean;
  opportunities: Opportunity[];
  activityTypes: UserActivityType[];
};

const useContact: UseContact = (activitiesPage) => {
  const [userActivityTypes, setUserActivityTypes] = useState<UserActivityType[]>([]);
  const [noteTypes, setNoteTypes] = useState<UserActivityType[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);

  const account = useQueryWithClient([QueryKey.ACCOUNT], getAccountService);

  const contact = useLinkedContact();

  const contactId = useMemo(() => contact?.contact?.id, [contact]);

  const pipelines = useQueryWithClient([QueryKey.PIPELINES], getPipelinesService);

  const opportunities = useQueryWithClient(
    [QueryKey.OPPORTUNITIES, `${contactId}`],
    (client) => getOpportunitiesService(client, { contactId }),
    { enabled: Boolean(contactId) },
  );

  const activityTypes = useQueryWithClient(
    [QueryKey.ACTIVITY_TYPES],
    getActivityTypesService,
    {
      onSuccess: (data) => {
        setUserActivityTypes(data.user.filter((a) => {
          const name = a.name.toLowerCase();
          return name.includes("call") || name.includes("meeting") || name.includes("sms");
        }));
        setNoteTypes(data.user.filter(({ name }) => {
          return name.toLowerCase().includes("note");
        }));

      },
    }
  );

  const activitiesLog = useQueryWithClient(
    [QueryKey.ACTIVITIES, `${activitiesPage}`, `${contactId}`],
    (client) => getActivitiesService(client, contactId as Contact["id"], {
      types: userActivityTypes.map((a) => pick(a, ["id", "category"])),
      page: activitiesPage,
    }),
    {
      enabled: Boolean(contactId) && userActivityTypes.length > 0,
      onSuccess: (data) => {
        setActivities((activities) => [
          ...activities,
          ...(Array.isArray(data) ? data : []).filter((a) => {
            return !activities.some(({ id }) => id === a.id);
          }),
        ]);
      },
    },
  );

  const notes = useQueryWithClient(
    [QueryKey.NOTES, `${contactId}`],
    (client) => getActivitiesService(client, contactId as Contact["id"], {
      types: noteTypes.map((a) => pick(a, ["id", "category"])),
    }),
    { enabled: Boolean(contactId) && noteTypes.length > 0 },
  );

  return {
    isLoading: [
      account,
      contact,
      activityTypes,
    ].some(({ isLoading }) => isLoading),
    contact: contact.contact as Contact,
    account: account.data as Account,
    activities,
    notes: Array.isArray(notes.data) ? notes.data : [],
    opportunities: useMemo(() => {
      return enhanceOpportunities(opportunities.data, pipelines.data)
    }, [opportunities.data, pipelines.data]),
    activityTypes: userActivityTypes,
    isLoadingActivities: activitiesLog.isLoading && userActivityTypes.length > 0,
  }
};

export { useContact };
