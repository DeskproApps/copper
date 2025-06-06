import { Stack } from "@deskpro/deskpro-ui";
import { getError } from "../../utils";
import { Container, ErrorBlock } from "../common";
import { FallbackRender } from "@sentry/react";

export const ErrorFallback: FallbackRender = ({ error }) => {
  const message = getError(error as Error);

  // eslint-disable-next-line no-console
  console.error(error);

  return (
    <Container>
      <ErrorBlock
        text={(
          <Stack gap={6} vertical style={{ padding: "8px" }}>
            {message}
          </Stack>
        )}
      />
    </Container>
  );
};
