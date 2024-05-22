import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSetTitle, useRegisterElements } from "../../hooks";
import { CreateContact } from "../../components";
import type { FC } from "react";

const CreateContactPage: FC = () => {
  const navigate = useNavigate();

  const onNavigateToLink = useCallback(() => navigate("/contacts/link"), [navigate]);

  useSetTitle();

  useRegisterElements(({ registerElement }) => {
    registerElement("home", {
      type: "home_button",
      payload: { type: "changePage", path: "/home" },
    });
  });

  return (
    <CreateContact
      onNavigateToLink={onNavigateToLink}
    />
  );
};

export { CreateContactPage };
