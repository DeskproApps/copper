import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "@deskpro/app-sdk";
import { useRegisterElements } from "../../hooks";
import { useContact } from "./hooks";
import { Home } from "../../components";

const HomePage = () => {
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

  const onNavigateToCreateOpportunity = useCallback(() => {
    navigate("/opportunity/create");
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
        payload: { type: "changePage", path: `/contacts/edit/${contact.id}` },
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
      onNavigateToCreateOpportunity={onNavigateToCreateOpportunity}
    />
  );
};

export { HomePage };
