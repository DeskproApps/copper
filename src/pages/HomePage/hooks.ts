import { useMemo } from "react";
import { get, filter } from "lodash";
import {
  useQueryWithClient,
  useDeskproLatestAppContext,
} from "@deskpro/app-sdk";
import {
  getAccount,
  getActivityTypes,
  getContactsByEmail,
  getActivitiesByContactId,
  getOpportunitiesByContactId,
} from "../../api/api";
import { isNote, isSms, isPhoneCall, isMeeting } from "../../utils";
import type { IAccount, IContact, IActivity, IOpportunity, IActivityType } from "../../api/types";

type UseContact = () => {
  isFetched: boolean;
  isLoading: boolean;
  contact: IContact;
  account: IAccount;
  activities: IActivity[];
  notes: IActivity[];
  opportunities: IOpportunity[];
  activityTypes: IActivityType[];
};

const useContact: UseContact = () => {
  const { context } = useDeskproLatestAppContext();
  const dpUserEmail = useMemo(() => get(context, ["data", "user", "primaryEmail"]), [context]);

  const account = useQueryWithClient(["account"], getAccount);

  const contact = useQueryWithClient(
    ["contact", dpUserEmail],
    (client) => getContactsByEmail(client, dpUserEmail),
    { enabled: Boolean(dpUserEmail) },
  );

  const contactId = useMemo(() => get(contact.data, ["id"]), [contact.data]);

  const opportunities = useQueryWithClient(
    ["opportunities", `${contactId}`],
    (client) => getOpportunitiesByContactId(client, contactId as IContact["id"]),
    { enabled: Boolean(contactId) },
  );

  const activitiesLog = useQueryWithClient(
    ["activity", `${contactId}`],
    (client) => getActivitiesByContactId(client, contactId as IContact["id"]),
    { enabled: Boolean(contactId) },
  );

  const activityTypes = useQueryWithClient(["activityTypes"], getActivityTypes);

  const notes = useMemo(() => filter(activitiesLog.data, (activity) => {
    return isNote(activity, activityTypes.data?.user);
  }), [activitiesLog.data, activityTypes.data?.user]);

  const activities = useMemo(() => filter(activitiesLog.data, (activity) => {
    return isSms(activity, activityTypes.data?.user)
      || isPhoneCall(activity, activityTypes.data?.user)
      || isMeeting(activity, activityTypes.data?.user);
  }), [activitiesLog.data, activityTypes.data?.user]);

  return {
    isLoading: Boolean(contactId) && [
      contact,
      account,
      opportunities,
      activitiesLog,
      activityTypes,
    ].some(({ isLoading }) => isLoading),
    isFetched: [contact].some(({ isFetched }) => isFetched),
    contact: contact.data as IContact,
    account: account.data as unknown as IAccount,
    activities,
    notes,
    opportunities: opportunities.data || [],
    activityTypes: get(activityTypes, ["data", "user"]) || []
  }
};

export { useContact };
