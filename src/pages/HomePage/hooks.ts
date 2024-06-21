import { useMemo } from "react";
import { get, filter } from "lodash";
import { useQueryWithClient } from "@deskpro/app-sdk";
import {
  getActivityTypes,
  getActivitiesByContactId,
} from "../../api/api";
import {
  getAccountService,
  getPipelinesService,
  getOpportunitiesService,
} from "../../services/copper";
import { useLinkedContact } from "../../hooks";
import { QueryKey } from "../../query";
import { isNote, isSms, isPhoneCall, isMeeting, enhanceOpportunities } from "../../utils";
import type { IAccount, IContact, IActivity, IOpportunity, IActivityType } from "../../api/types";
import type { Contact } from "../../services/copper/types";

type UseContact = () => {
  isLoading: boolean;
  contact: Contact;
  account: IAccount;
  activities: IActivity[];
  notes: IActivity[];
  opportunities: IOpportunity[];
  activityTypes: IActivityType[];
};

const useContact: UseContact = () => {
  const account = useQueryWithClient([QueryKey.ACCOUNT], getAccountService);

  const contact = useLinkedContact();

  const contactId = useMemo(() => get(contact, ["contact", "id"]), [contact]);

  const pipelines = useQueryWithClient([QueryKey.PIPELINES], getPipelinesService);

  const opportunities = useQueryWithClient(
    [QueryKey.OPPORTUNITIES, contactId],
    (client) => getOpportunitiesService(client, { contactId }),
    { enabled: Boolean(contactId) },
  );

  // console.log(">>> hook:", pipelines);

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
    isLoading: [
      account,
      contact,
      activityTypes,
    ].some(({ isLoading }) => isLoading),
    contact: contact.contact as Contact,
    account: account.data as unknown as IAccount,
    activities,
    notes,
    opportunities: useMemo(() => {
      return enhanceOpportunities(opportunities.data, pipelines.data)
    }, [opportunities.data, pipelines.data]),
    activityTypes: get(activityTypes, ["data", "user"]) || []
  }
};

export { useContact };
