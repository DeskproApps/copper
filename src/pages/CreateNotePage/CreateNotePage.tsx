import { useMemo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useDeskproAppClient } from "@deskpro/app-sdk";
import { createNoteService } from "../../services/copper";
import { useSetTitle, useLinkedContact, useRegisterElements } from "../../hooks";
import { getError } from "../../utils";
import { getValues } from "../../components/NoteForm";
import { CreateNote } from "../../components";
import type { FC } from "react";
import type { Maybe } from "../../types";
import type { FormValidationSchema } from "../../components/NoteForm";


const CreateNotePage: FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { client } = useDeskproAppClient();
  const { contact } = useLinkedContact();
  const [error, setError] = useState<Maybe<string|string[]>>(null);
  const contactId = useMemo(() => contact?.id, [contact]);

  const debouncedInvalidate = useCallback(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["activity"] }).then(resolve)
      }, 3000);
    });
  }, [queryClient]);

  const onCancel = useCallback(() => navigate("/home"), [navigate]);

  const onSubmit = useCallback((data: FormValidationSchema) => {
    if (!client || !contactId) {
      return Promise.resolve();
    }

    setError(null);

    return createNoteService(client, contactId, getValues(data))
      .then(() => debouncedInvalidate())
      .then(() => navigate("/home"))
      .catch((err) => setError(getError(err)));
  }, [client, contactId, navigate, debouncedInvalidate]);

  useSetTitle("Note");

  useRegisterElements(({ registerElement }) => {
    registerElement("refresh", { type: "refresh_button" });
    registerElement("home", {
      type: "home_button",
      payload: { type: "changePage", path: "/home" },
    });
  });

  return (
    <CreateNote
      error={error}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
};

export { CreateNotePage };
