import { Stack } from "@deskpro/deskpro-ui";
import { Button } from "../../common";
import type { FC } from "react";
import type { Maybe } from "../../../types";
import type { Contact } from "../../../services/copper/types";

export type Props = {
  isSubmitting: boolean;
  onCancel: () => void;
  selectedContact: Maybe<Contact>;
  onLinkContact: () => void;
};

const Buttons: FC<Props> = ({ isSubmitting, selectedContact, onLinkContact, onCancel }) => (
  <Stack justify="space-between">
    <Button
      type="button"
      text="Link Contact"
      disabled={!selectedContact || isSubmitting}
      loading={isSubmitting}
      onClick={onLinkContact}
    />
    <Button
      type="button"
      text="Cancel"
      intent="secondary"
      onClick={onCancel}
    />
  </Stack>
);

export { Buttons };
