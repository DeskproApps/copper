import { LinkContact } from "../../components";
import { useDebouncedCallback } from "use-debounce";
import { useNavigate } from "react-router-dom";
import { useRegisterElements, useSetTitle } from "../../hooks";
import { useSearch } from "./hooks";
import { useState, useCallback } from "react";
import { useDeskproAppClient, useDeskproLatestAppContext } from "@deskpro/app-sdk";
import type { Contact } from "../../services/copper/types";
import type { FC } from "react";
import type { Maybe, Settings, UserData } from "../../types";
import { setEntity } from "@/services/deskpro";

const LinkContactPage: FC = () => {
  const navigate = useNavigate();
  const { client } = useDeskproAppClient();
  const { context } = useDeskproLatestAppContext<UserData, Settings>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [selectedContact, setSelectedContact] = useState<Maybe<Contact>>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { contacts, account, isLoading } = useSearch(searchQuery);
  const dpUserId = context?.data?.user?.id

  const onChangeSearch = useDebouncedCallback(setSearchQuery, 1000);

  const onNavigateToCreate = useCallback(() => navigate("/contacts/create"), [navigate]);

  const onCancel = useCallback(() => navigate("/home"), [navigate]);

  const onLinkContact = useCallback(() => {
    if (!client || !dpUserId || !selectedContact?.id) {
      return;
    }

    setIsSubmitting(true);

    return setEntity(client, { type: "user", userId: dpUserId, entityKey: selectedContact.id.toString() })
      .then(() => navigate("/home"))
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error("Error Linking Contact: ", e instanceof Error ? e.message : "Unknown Error")
      })
      .finally(() => setIsSubmitting(false));
  }, [client, dpUserId, selectedContact, navigate]);

  const isUsingOAuth = context?.settings.use_api_key === false || context?.settings.use_advanced_connect === false;

  useSetTitle();

  useRegisterElements(({ registerElement }) => {
    registerElement("home", {
      type: "home_button",
      payload: { type: "changePage", path: "/home" },
    });

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
    <LinkContact
      account={account}
      onCancel={onCancel}
      contacts={contacts}
      isLoading={isLoading}
      isSubmitting={isSubmitting}
      onLinkContact={onLinkContact}
      onChangeSearch={onChangeSearch}
      selectedContact={selectedContact}
      onNavigateToCreate={onNavigateToCreate}
      onChangeSelectedContact={setSelectedContact}
    />
  );
};

export { LinkContactPage };
