import { Stack } from "@deskpro/deskpro-ui";
import { Button } from "@/components/common";
import type { FC } from "react";
import type { Company } from "@/services/copper/types";

export type Props = {
  isSubmitting: boolean;
  onCancel: () => void;
  selectedCompanies: Company[];
  onLinkCompanies: () => void;
};

const Buttons: FC<Props> = ({
  onCancel,
  isSubmitting,
  onLinkCompanies,
  selectedCompanies,
}) => (
  <Stack justify="space-between">
    <Button
      type="button"
      text="Link Companies"
      disabled={selectedCompanies.length === 0 || isSubmitting}
      loading={isSubmitting}
      onClick={onLinkCompanies}
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
