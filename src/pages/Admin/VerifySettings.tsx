import {
  Button,
  H1,
  Stack,
  adminGenericProxyFetch,
  useDeskproAppClient,
  useDeskproAppEvents,
} from "@deskpro/app-sdk";
import { useState } from "react";

export const VerifySettings = () => {
  const [verifyMessage, setVerifyMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState<Record<string, string> | null>(null);
  const { client } = useDeskproAppClient();
  useDeskproAppEvents(
    {
      onAdminSettingsChange: setSettings,
    },
    []
  );

  const onClick = async () => {
    if (!client || !settings) return;

    setLoading(true);

    const fetch = await adminGenericProxyFetch(client);

    const response = await fetch(
      `https://api.copper.com/developer_api/v1/pipelines`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-PW-Application": "developer_api",
          "X-PW-AccessToken": settings?.api_key as string,
          "X-PW-UserEmail": settings?.api_key_owner_email as string,
        },
      }
    );

    if (response.status === 200) {
      setVerifyMessage("Success!");
    } else {
      setVerifyMessage("Failed, please check your settings and try again.");
    }
    setLoading(false);
  };

  return (
    <Stack gap={5} style={{ marginLeft: "-8px" }} vertical>
      <Button
        text="Verify"
        onClick={onClick}
        loading={loading}
        disabled={loading}
      />
      {verifyMessage && <H1>{verifyMessage}</H1>}
    </Stack>
  );
};
