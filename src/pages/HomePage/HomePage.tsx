import { LoadingSpinner } from "@deskpro/app-sdk";
import { useRegisterElements } from "../../hooks";
import { useContact } from "./hooks";
import { Home } from "../../components";

const HomePage = () => {
  const {
    isLoading,
    isFetched,
    contact,
    account,
    opportunities,
    notes,
    activities,
    activityTypes,
  } = useContact();

  useRegisterElements(({ registerElement }) => {
    registerElement("refresh", { type: "refresh_button" });
  });

  if (isLoading || !isFetched) {
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
