import { CreateOpportunity } from "@/components";
import { createOpportunityService } from "@/services/copper";
import { getError } from "@/utils";
import { getValues } from "@/components/OpportunityForm";
import { queryClient } from "@/query";
import { useDeskproAppClient, LoadingSpinner } from "@deskpro/app-sdk";
import { useNavigate } from "react-router-dom";
import { useSetTitle, useLinkedContact, useRegisterElements } from "@/hooks";
import { useState, useCallback } from "react";
import type { Contact } from "@/services/copper/types";
import type { FC } from "react";
import type { FormValidationSchema } from "@/components/OpportunityForm";
import type { Maybe } from "@/types";

const CreateOpportunityPage: FC = () => {
  const navigate = useNavigate();
  const { client } = useDeskproAppClient();
  const { isLoading, contact } = useLinkedContact();
  const [error, setError] = useState<Maybe<string | string[]>>(null);

  const onCancel = useCallback(() => navigate(`/home`), [navigate]);

  const onSubmit = useCallback((data: FormValidationSchema) => {
    if (!client || !contact) {
      return Promise.resolve();
    }

    return createOpportunityService(client, getValues(data, contact as Contact))
      .then(() => queryClient.invalidateQueries())
      .then(() => navigate("/home"))
      .catch((err) => setError(getError(err)));
  }, [client, contact, navigate]);

  useSetTitle("Create Opportunity");

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
    <CreateOpportunity
      error={error}
      contact={contact}
      onCancel={onCancel}
      onSubmit={onSubmit}
    />
  );
};

export { CreateOpportunityPage };
