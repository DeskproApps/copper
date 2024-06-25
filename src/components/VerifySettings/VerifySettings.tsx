import { get } from "lodash";
import { Stack } from "@deskpro/deskpro-ui";
import { nbsp } from "../../constants";
import { Button, Invalid, Secondary } from "../common";
import type { FC } from "react";
import type { Maybe, Settings } from "../../types";
import type { Account } from "../../services/copper/types";

export type Props = {
  isLoading: boolean;
  settings: Settings;
  error: Maybe<string>;
  account: Maybe<Account>;
  onVerifySettings: () => void;
};

const VerifySettings: FC<Props> = ({
  error,
  account,
  settings,
  isLoading,
  onVerifySettings,
}) => {
  return (
    <Stack align="baseline">
      <Button
        text="Verify Settings"
        intent="secondary"
        onClick={onVerifySettings}
        loading={isLoading}
        disabled={!settings?.api_key || isLoading}
      />
      {nbsp}
      {!account
        ? <Invalid type="p1">{error}</Invalid> || ""
        : (
          <Secondary>Verified as &lt;{get(account, ["name"])}&gt;</Secondary>
        )
      }
    </Stack>
  );
};

export { VerifySettings };
