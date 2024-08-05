import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDeskproAppClient, LoadingSpinner } from "@deskpro/app-sdk";
import { useSetTitle, useLinkedContact, useRegisterElements } from "@/hooks";
import { createOpportunityService } from "@/services/copper";
import { getError } from "@/utils";
import { queryClient } from "@/query";
import { getValues } from "@/components/OpportunityForm";
import { CreateOpportunity } from "@/components";
import type { FC } from "react";
import type { Maybe } from "@/types";
import type { Contact } from "@/services/copper/types";
import type { FormValidationSchema } from "@/components/OpportunityForm";

const CreateOpportunityPage: FC = () => {
  const navigate = useNavigate();
  const { client } = useDeskproAppClient();
  const { isLoading, contact } = useLinkedContact();
  const [error, setError] = useState<Maybe<string|string[]>>(null);

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
      <LoadingSpinner/>
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
