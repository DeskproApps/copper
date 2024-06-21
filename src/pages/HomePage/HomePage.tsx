import { LoadingSpinner } from "@deskpro/app-sdk";
import { useRegisterElements } from "../../hooks";
import { useContact } from "./hooks";
import { Home } from "../../components";

const HomePage = () => {
  const {
    isLoading,
    contact,
    account,
    opportunities,
    notes,
    activities,
    activityTypes,
  } = useContact();

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
    />
  );
};

export { HomePage };
