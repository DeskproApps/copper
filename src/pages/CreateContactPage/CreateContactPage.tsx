import { CreateContact } from "@/components";
import { createContactService } from "@/services/copper";
import { getContactValues } from "../../components/ContactForm";
import { getError } from "@/utils";
import { setEntity } from "@/services/deskpro";
import { Settings, UserData, type Maybe } from "@/types";
import { useDeskproAppClient, useDeskproLatestAppContext } from "@deskpro/app-sdk";
import { useNavigate } from "react-router-dom";
import { useSetTitle, useRegisterElements } from "@/hooks";
import { useState, useCallback } from "react";
import type { FC } from "react";
import type { FormValidationSchema } from "@/components/ContactForm";

const CreateContactPage: FC = () => {
  const navigate = useNavigate();
  const { client } = useDeskproAppClient();
  const { context } = useDeskproLatestAppContext<UserData, Settings>();
  const [error, setError] = useState<Maybe<string | string[]>>(null);
  const dpUser = context?.data?.user

  const onNavigateToLink = useCallback(() => navigate("/contacts/link"), [navigate]);

  const onCancel = useCallback(() => navigate(`/home`), [navigate]);

  const isUsingOAuth = context?.settings.use_api_key === false || context?.settings.use_advanced_connect === false;

  const onSubmit = useCallback(async (data: FormValidationSchema) => {
    if (!client || !dpUser?.id) {
      return 
    }

    return createContactService(client, getContactValues(data))
      .then((contact) => {
        return !contact?.id
          ? Promise.resolve()
          : setEntity(client, { type: "user", userId: dpUser.id, entityKey: contact.id.toString() })
      })
      .then(() => navigate("/home"))
      .catch((err) => setError(getError(err)));
  }, [client, dpUser?.id, navigate]);

  useSetTitle();

  useRegisterElements(({ registerElement }) => {
    registerElement("home", {
      type: "home_button",
      payload: { type: "changePage", path: "/home" },
    })

    if (isUsingOAuth) {
      registerElement("menu", {
        type: "menu",
        items: [{
          title: "Logout",
          payload: { type: "logout" },
        }
        ],
      })
    }
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
