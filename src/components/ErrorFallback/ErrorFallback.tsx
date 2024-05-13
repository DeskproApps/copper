import { get } from "lodash";
import { Stack } from "@deskpro/deskpro-ui";
import { DEFAULT_ERROR } from "../../constants";
import { Container, ErrorBlock } from "../common";
import type { FC } from "react";
import type { FallbackProps } from "react-error-boundary";

type Props = Omit<FallbackProps, "error"> & {
  error: Error,
};

export const ErrorFallback: FC<Props> = ({ error }) => {
  let parsedMessage;
  let parsedError;

  try {
    parsedMessage = JSON.parse(get(error, ["message"]));
    parsedError = JSON.parse(get(parsedMessage, ["message"]));
  } catch (e) {
    //..
  }

  const message = get(parsedError, ["error"]) || DEFAULT_ERROR;

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
