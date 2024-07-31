import { Stack } from "@deskpro/deskpro-ui";
import { getError } from "@/utils";
import { Container, ErrorBlock } from "@/components/common";
import type { FC } from "react";
import type { FallbackProps } from "react-error-boundary";

type Props = Omit<FallbackProps, "error"> & {
  error: Error,
};

export const ErrorFallback: FC<Props> = ({ error }) => {
  const message = getError(error);

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
