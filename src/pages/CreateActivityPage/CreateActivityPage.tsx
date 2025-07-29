import { CreateActivity } from "@/components";
import { createActivityService } from "@/services/copper";
import { getError } from "@/utils";
import { getValues } from "@/components/ActivityForm";
import { useDeskproAppClient } from "@deskpro/app-sdk";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useSetTitle, useRegisterElements, useLinkedContact } from "@/hooks";
import { useCallback, useState } from "react";
import type { FC } from "react";
import type { FormValidationSchema } from "@/components/ActivityForm";
import type { Maybe } from "@/types";

const CreateActivityPage: FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { client } = useDeskproAppClient();
  const { contact } = useLinkedContact();
  const [error, setError] = useState<Maybe<string | string[]>>(null);
  const contactId = contact?.id

  const debouncedInvalidate = useCallback(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["activity"] }).then(resolve)
      }, 4000);
    });
  }, [queryClient]);

  const onCancel = useCallback(() => navigate("/home"), [navigate]);

  const onSubmit = useCallback((data: FormValidationSchema) => {
    if (!client || !contactId) {
      return Promise.resolve();
    }

    setError(null);

    return createActivityService(client, contactId, getValues(data))
      .then(() => debouncedInvalidate())
      .then(() => navigate("/home"))
      .catch((err) => setError(getError(err)));
  }, [client, contactId, navigate, debouncedInvalidate]);

  useSetTitle("Activity");

  useRegisterElements(({ registerElement }) => {
    registerElement("refresh", { type: "refresh_button" });
    registerElement("home", {
      type: "home_button",
      payload: { type: "changePage", path: "/home" },
    });
  });

  return (
    <CreateActivity
      error={error}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
};

export { CreateActivityPage };
