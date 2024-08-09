import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "@deskpro/app-sdk";
import { useRegisterElements } from "@/hooks";
import { useContact } from "./hooks";
import { Home } from "@/components";

const HomePage = () => {
  const navigate = useNavigate();
  const [activitiesPage, setActivitiesPage] = useState<number>(1);
  const {
    isLoading,
    contact,
    account,
    opportunities,
    notes,
    activities,
    activityTypes,
    isLoadingActivities,
  } = useContact(activitiesPage);

  const onNextActivitiesPage = useCallback(() => setActivitiesPage(activitiesPage + 1), [activitiesPage]);

  const onNavigateToCreateOpportunity = useCallback(() => {
    navigate("/opportunity/create");
  }, [navigate]);

  const onNavigateToCreateNote = useCallback(() => {
    navigate("/notes/create");
  }, [navigate]);

  const onNavigateToCreateActivity = useCallback(() => {
    navigate("/activities/create");
  }, [navigate]);


  useRegisterElements(({ registerElement }) => {
    registerElement("menu", {
      type: "menu",
      items: [{
        title: !contact?.id ? "Link Contact" : "Unlink Contact",
        payload: { type: "unlink" },
      }],
    });
    if (contact?.id) {
      registerElement("edit", {
        type: "edit_button",
        payload: { type: "changePage", path: `/contacts/${contact.id}/edit` },
      });
    }
  }, [contact?.id]);

  if (isLoading) {
    return (
      <LoadingSpinner />
    );
  }

  return (
    <Home
      isLoadingActivities={isLoadingActivities}
      onNextActivitiesPage={onNextActivitiesPage}
      contact={contact}
      account={account}
      activities={activities}
      notes={notes}
      opportunities={opportunities}
      activityTypes={activityTypes}
      onNavigateToCreateNote={onNavigateToCreateNote}
      onNavigateToCreateActivity={onNavigateToCreateActivity}
      onNavigateToCreateOpportunity={onNavigateToCreateOpportunity}
    />
  );
};

export { HomePage };
