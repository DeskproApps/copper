import { useMemo } from "react";
import { get, filter } from "lodash-es";
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
import { isNote, isSms, isPhoneCall, isMeeting, enhanceOpportunities } from "@/utils";
import type {
  Account,
  Contact,
  Activity,
  Opportunity,
  UserActivityType,
} from "@/services/copper/types";

type UseContact = () => {
  isLoading: boolean;
  contact: Contact;
  account: Account;
  activities: Activity[];
  notes: Activity[];
  opportunities: Opportunity[];
  activityTypes: UserActivityType[];
};

const useContact: UseContact = () => {
  const account = useQueryWithClient([QueryKey.ACCOUNT], getAccountService);

  const contact = useLinkedContact();

  const contactId = useMemo(() => get(contact, ["contact", "id"]), [contact]);

  const pipelines = useQueryWithClient([QueryKey.PIPELINES], getPipelinesService);

  const opportunities = useQueryWithClient(
    [QueryKey.OPPORTUNITIES, `${contactId}`],
    (client) => getOpportunitiesService(client, { contactId }),
    { enabled: Boolean(contactId) },
  );

  const activitiesLog = useQueryWithClient(
    [QueryKey.ACTIVITIES, `${contactId}`],
    (client) => getActivitiesService(client, contactId as Contact["id"]),
    { enabled: Boolean(contactId) },
  );

  const activityTypes = useQueryWithClient(
    [QueryKey.ACTIVITY_TYPES],
    getActivityTypesService,
  );

  const notes = useMemo(() => filter(activitiesLog.data, (activity) => {
    return isNote(activity, activityTypes.data?.user);
  }), [activitiesLog.data, activityTypes.data?.user]);

  const activities = useMemo(() => filter(activitiesLog.data, (activity) => {
    return isSms(activity, activityTypes.data?.user)
      || isPhoneCall(activity, activityTypes.data?.user)
      || isMeeting(activity, activityTypes.data?.user);
  }), [activitiesLog.data, activityTypes.data?.user]);

  return {
    isLoading: [
      account,
      contact,
      activityTypes,
    ].some(({ isLoading }) => isLoading),
    contact: contact.contact as Contact,
    account: account.data as Account,
    activities,
    notes,
    opportunities: useMemo(() => {
      return enhanceOpportunities(opportunities.data, pipelines.data)
    }, [opportunities.data, pipelines.data]),
    activityTypes: get(activityTypes, ["data", "user"]) || []
  }
};

export { useContact };
