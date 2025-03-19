import { LinkContact } from "../../components";
import { setEntityService } from "../../services/deskpro";
import { useDebouncedCallback } from "use-debounce";
import { useNavigate } from "react-router-dom";
import { useRegisterElements, useSetTitle, useAsyncError } from "../../hooks";
import { useSearch } from "./hooks";
import { useState, useCallback } from "react";
import { useDeskproAppClient, useDeskproLatestAppContext } from "@deskpro/app-sdk";
import type { Contact } from "../../services/copper/types";
import type { FC } from "react";
import type { Maybe, Settings, UserData } from "../../types";

const LinkContactPage: FC = () => {
  const navigate = useNavigate();
  const { client } = useDeskproAppClient();
  const { context } = useDeskproLatestAppContext<UserData, Settings>();
  const { asyncErrorHandler } = useAsyncError();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [selectedContact, setSelectedContact] = useState<Maybe<Contact>>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { contacts, account, isLoading } = useSearch(searchQuery);
  const dpUserId = context?.data?.user.id

  const onChangeSearch = useDebouncedCallback(setSearchQuery, 1000);

  const onNavigateToCreate = useCallback(() => navigate("/contacts/create"), [navigate]);

  const onCancel = useCallback(() => navigate("/home"), [navigate]);

  const onLinkContact = useCallback(() => {
    if (!client || !dpUserId || !selectedContact?.id) {
      return;
    }

    setIsSubmitting(true);

    return setEntityService(client, dpUserId, `${selectedContact.id}`)
      .then(() => navigate("/home"))
      .catch(asyncErrorHandler)
      .finally(() => setIsSubmitting(false));
  }, [client, dpUserId, selectedContact, asyncErrorHandler, navigate]);

  const isUsingOAuth = context?.settings.use_api_key !== true || context.settings.use_advanced_connect === false

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
