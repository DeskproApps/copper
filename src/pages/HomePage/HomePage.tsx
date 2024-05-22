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
        title: "Unlink Contact",
        payload: { type: "unlink" },
      }],
    });
  });

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
