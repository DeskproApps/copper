import { Home } from "@/components";
import { LoadingSpinner, useDeskproLatestAppContext } from "@deskpro/app-sdk";
import { Settings } from "@/types";
import { useCallback } from "react";
import { useContact } from "./hooks";
import { useNavigate } from "react-router-dom";
import { useRegisterElements } from "@/hooks";

const HomePage = () => {
  const { context } = useDeskproLatestAppContext<unknown, Settings>();

  const navigate = useNavigate();
  const {
    isLoading,
    contact,
    account,
    opportunities,
    notes,
    activities,
    activityTypes,
  } = useContact();

  const isUsingOAuth = context?.settings.use_api_key === false || context?.settings.use_advanced_connect === false;

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
      },
      ...(isUsingOAuth
        ? [
          {
            title: "Logout",
            payload: { type: "logout" },
          },
        ]
        : [])
      ],
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
