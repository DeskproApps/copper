import { useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { LoadingSpinner } from "@deskpro/app-sdk";
import { useSetTitle, useRegisterElements } from "@/hooks";
import { Company } from "@/components";
import { useCompany } from "./hooks";
import type { FC } from "react";

const CompanyPage: FC = () => {
  const { id } = useParams();
  const [peoplePage, setPeoplePage] = useState<number>(1);
  const [activitiesPage, setActivitiesPage] = useState<number>(1);
  const {
    people,
    account,
    company,
    isLoading,
    activities,
    activityTypes,
    primaryContact,
    isLoadingPeople,
    isLoadingActivities,
  } = useCompany(parseInt(id || ""), peoplePage, activitiesPage);

  const onNextPeoplePage = useCallback(() => setPeoplePage(peoplePage + 1), [peoplePage]);

  const onNextActivitiesPage = useCallback(() => setActivitiesPage(activitiesPage + 1), [activitiesPage]);

  useSetTitle();

  useRegisterElements(({ registerElement }) => {
    registerElement("home", {
      type: "home_button",
      payload: { type: "changePage", path: "/companies/home" },
    });
    if (company) {
      registerElement("menu", {
        type: "menu",
        items: [{
          title: "Unlink company",
          payload: { type: "unlink_company", company },
        }],
      });
    }
  }, [company]);

  if (isLoading || !company) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
    <Company
      people={people}
      company={company}
      account={account}
      activities={activities}
      activityTypes={activityTypes}
      primaryContact={primaryContact}
      isLoadingPeople={isLoadingPeople}
      onNextPeoplePage={onNextPeoplePage}
      isLoadingActivities={isLoadingActivities}
      onNextActivitiesPage={onNextActivitiesPage}
    />
  );
};

export { CompanyPage };
