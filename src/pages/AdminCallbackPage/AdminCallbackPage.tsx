import { CopyToClipboardInput, LoadingSpinner, OAuth2Result, useInitialisedDeskproAppClient, } from "@deskpro/app-sdk";
import { createSearchParams } from "react-router-dom";
import { P1 } from "@deskpro/deskpro-ui";
import { ThemeProps } from "../../types";
import { useState } from "react";
import styled from "styled-components";
import type { FC } from "react";

const Description = styled(P1)`
  margin-top: 8px;
  margin-bottom: 16px;
  color: ${({ theme }: ThemeProps) => theme.colors.grey80};
`;

const AdminCallbackPage: FC = () => {
  const [callbackUrl, setCallbackUrl] = useState<string | null>(null)

  useInitialisedDeskproAppClient(async (client) => {
    const oauth2 = await client.startOauth2Local(
      ({ callbackUrl, state }) => {
        return `https://app.copper.com/oauth/authorize?${createSearchParams([
          ["response_type", "code"],
          ["client_id", "xxx"],
          ["scope", "developer/v1/all"],
          ["state", state],
          ["redirect_uri", callbackUrl],
        ])}`
      },
      /code=(?<code>[0-9a-f]+)/,
      async (): Promise<OAuth2Result> => ({ data: { access_token: "", refresh_token: "" } })
    )

    const url = new URL(oauth2.authorizationUrl);
    const redirectUri = url.searchParams.get("redirect_uri")

    if (redirectUri) {
      setCallbackUrl(redirectUri)
    }
  })

  if (!callbackUrl) {
    return (<LoadingSpinner />)
  }

  return (
    <>
      <CopyToClipboardInput value={callbackUrl} />
      <Description>The callback URL will be required during the Copper app setup</Description>
    </>
  );
};

export { AdminCallbackPage }
