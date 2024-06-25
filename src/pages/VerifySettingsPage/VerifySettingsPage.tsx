import { useState } from "react";
import {
  useDeskproAppClient,
  useDeskproAppEvents,
  adminGenericProxyFetch,
} from "@deskpro/app-sdk";
import { VerifySettings } from "../../components";
import type { Maybe, Settings } from "../../types";
import type { Account } from "../../services/copper/types";

const VerifySettingsPage = () => {
  const { client } = useDeskproAppClient();
  const [account, setAccount] = useState<Maybe<Account>>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [settings, setSettings] = useState<Settings>({});
  const [error, setError] = useState<Maybe<string>>(null);
  const errorMessage = "Failed, please check your settings and try again.";

  useDeskproAppEvents({
    onAdminSettingsChange: setSettings,
  }, []);

  const onVerifySettings = async () => {
    if (!client || !settings) {
      return;
    }

    setAccount(null);
    setError(null);
    setIsLoading(true);

    const fetch = await adminGenericProxyFetch(client);

    const response = await fetch(`https://api.copper.com/developer_api/v1/account`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-PW-Application": "developer_api",
        "X-PW-AccessToken": settings?.api_key as string,
        "X-PW-UserEmail": settings?.api_key_owner_email as string,
      },
    });

    if (response.status === 200) {
      try {
        const account = await response.json();
        setAccount(account);
      } catch (e) {
        setError(errorMessage);
      }
    } else {
      setError(errorMessage);
    }

    setIsLoading(false);
  };

  return (
    <VerifySettings
      error={error}
      settings={settings}
      account={account}
      isLoading={isLoading}
      onVerifySettings={onVerifySettings}
    />
  );
};

export { VerifySettingsPage };
