import { useParams } from "react-router-dom";
import { LoadingSpinner,  } from "@deskpro/app-sdk";
import { useSetTitle, useRegisterElements } from "../../hooks";
import { useOpportunity } from "./hooks";
import { Opportunity } from "../../components";
import type { FC } from "react";

const OpportunityPage: FC = () => {
  const { id } = useParams();
  const { isLoading, opportunity } = useOpportunity(id as never);

  useSetTitle();

  useRegisterElements(({ registerElement }) => {
    registerElement("home", {
      type: "home_button",
      payload: { type: "changePage", path: "/home" },
    });
  });

  if (isLoading) {
    return (
      <LoadingSpinner />
    );
  }

  return (
    <Opportunity opportunity={opportunity}/>
  );
};

export { OpportunityPage };
