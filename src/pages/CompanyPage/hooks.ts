import { useMemo, useState } from "react";
import { pick } from "lodash-es";
import { useQueryWithClient } from "@deskpro/app-sdk";
import {
  getAccountService,
  getCompanyService,
  getContactService,
  getContactsService,
  getCompanyPeopleService,
  getActivityTypesService,
  getCompanyActivitiesService,
} from "@/services/copper";
import { QueryKey } from "@/query";
import type { Maybe } from "@/types";
import type { Account, Company, Contact, Activity, UserActivityType } from "@/services/copper/types";

type UseCompany = (
  companyId: Maybe<Company["id"]>,
  peoplePage: number,
  activitiesPage: number,
) => {
  isLoading: boolean;
  account: Maybe<Account>;
  company: Maybe<Company>;
  primaryContact: Maybe<Contact>;
  people: Contact[];
  activities: Activity[];
  isLoadingPeople: boolean;
  isLoadingActivities: boolean;
  activityTypes: UserActivityType[];
};

const useCompany: UseCompany = (companyId, peoplePage, activitiesPage) => {
  const [people, setPeople] = useState<Contact[]>([]);
  const [userActivityTypes, setUserActivityTypes] = useState<UserActivityType[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);

  const account = useQueryWithClient([QueryKey.ACCOUNT], getAccountService);

  const company = useQueryWithClient(
    [QueryKey.COMPANY, `${companyId as Company["id"]}`],
    (client) => getCompanyService(client, companyId as Company["id"]),
    { enabled: Boolean(companyId) },
  );

  const primaryContact = useQueryWithClient(
    [QueryKey.CONTACT, `${company.data?.primary_contact_id as Contact["id"]}`],
    (client) => getContactService(client, company.data?.primary_contact_id as Contact["id"]),
    { enabled: Boolean(company.data?.primary_contact_id) },
  );

  const peopleRelated = useQueryWithClient(
    [QueryKey.COMPANY_PEOPLE, `${companyId as Company["id"]}`],
    (client) => getCompanyPeopleService(client, companyId as Company["id"]),
    { enabled: Boolean(companyId) },
  );

  const peopleIds = useMemo(() => {
    return Array.isArray(peopleRelated.data) ? peopleRelated.data.map(({ id }) => id) : [];
  }, [peopleRelated.data]);

  const loadingPeople = useQueryWithClient(
    [QueryKey.CONTACTS, `${peoplePage}`, ...peopleIds.map((id) => `${id}`)],
    (client) => getContactsService(client, { ids: peopleIds, page: peoplePage }),
    {
      enabled: peopleIds?.length > 0,
      onSuccess: (data) => {
        setPeople((people) => [
          ...people,
          ...(Array.isArray(data) ? data : []).filter((p) => {
            return !people.some((person) => person.id === p.id);
          }),
        ]);
      },
    },
  );

  const activityTypes = useQueryWithClient(
    [QueryKey.ACTIVITY_TYPES],
    getActivityTypesService,
    {
      onSuccess: (data) => {
        setUserActivityTypes(data.user.filter((a) => {
          const name = a.name.toLowerCase();
          return name.includes("call") || name.includes("meeting") || name.includes("sms")
        }));
      },
    }
  );

  const activitiesLoading = useQueryWithClient(
    [QueryKey.ACTIVITIES, `${activitiesPage}`, `${companyId}`],
    (client) => getCompanyActivitiesService(client, companyId as Contact["id"], {
      types: userActivityTypes.map((a) => pick(a, ["id", "category"])),
      page: activitiesPage,
    }),
    {
      enabled: Boolean(companyId) && userActivityTypes.length > 0,
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

  return {
    isLoading: [account, activityTypes].some(({ isLoading }) => isLoading),
    account: account.data,
    company: company.data,
    primaryContact: primaryContact.data,
    people: people,
    isLoadingPeople: loadingPeople.isLoading,
    activities: activities,
    isLoadingActivities: activitiesLoading.isLoading && userActivityTypes.length > 0,
    activityTypes: userActivityTypes,
  };
};

export { useCompany };
