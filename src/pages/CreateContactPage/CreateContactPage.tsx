import { useMemo, useState, useCallback } from "react";
import { get } from "lodash";
import { useNavigate } from "react-router-dom";
import { useDeskproAppClient, useDeskproLatestAppContext } from "@deskpro/app-sdk";
import { setEntityService } from "../../services/deskpro";
import { createContactService } from "../../services/copper";
import { useSetTitle, useRegisterElements } from "../../hooks";
import { getError } from "../../utils";
import { getContactValues } from "../../components/ContactForm";
import { CreateContact } from "../../components";
import type { FC } from "react";
import type { Maybe, UserContext } from "../../types";
import type { FormValidationSchema } from "../../components/ContactForm";

const CreateContactPage: FC = () => {
  const navigate = useNavigate();
  const { client } = useDeskproAppClient();
  const { context } = useDeskproLatestAppContext() as { context: UserContext };
  const [error, setError] = useState<Maybe<string|string[]>>(null);
  const dpUser = useMemo(() => get(context, ["data", "user"]), [context]);

  const onNavigateToLink = useCallback(() => navigate("/contacts/link"), [navigate]);

  const onCancel = useCallback(() => navigate(`/home`), [navigate]);

  const onSubmit = useCallback((data: FormValidationSchema) => {
    if (!client || !dpUser?.id) {
      return Promise.resolve();
    }

    return createContactService(client, getContactValues(data))
      .then((contact) => {
        return !contact?.id
          ? Promise.resolve()
          : setEntityService(client, dpUser.id, `${contact.id}`);
      })
      .then(() => navigate("/home"))
      .catch((err) => setError(getError(err)));
  }, [client, dpUser?.id, navigate]);

  useSetTitle();

  useRegisterElements(({ registerElement }) => {
    registerElement("home", {
      type: "home_button",
      payload: { type: "changePage", path: "/home" },
    });
  });

  return (
    <CreateContact
      error={error}
      contact={dpUser}
      onCancel={onCancel}
      onSubmit={onSubmit}
      onNavigateToLink={onNavigateToLink}
    />
  );
};

export { CreateContactPage };
