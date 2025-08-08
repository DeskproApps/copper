import { Button, Stack } from "@deskpro/deskpro-ui";
import { CopperError } from "@/services/copper";
import { faExclamationTriangle, faRefresh } from "@fortawesome/free-solid-svg-icons";
import { FallbackRender } from "@sentry/react";
import Callout from "../Callout";

export const ErrorFallback: FallbackRender = ({ error, resetError }) => {

  let errorMessage = "An unknown error occurred."

  if (error instanceof CopperError && typeof error.data.message === "string" && error.data.message.trim() !== "") {
    errorMessage = error.data.message
  } else if (error instanceof Error && error.message.trim() !== "") {
    errorMessage = error.message
  }

  // eslint-disable-next-line no-console
  console.error(errorMessage);

  return (
    <Stack style={{ width: "100%" }} vertical gap={10} padding={12} role="alert">
      <Callout
        accent="red"
        headingText={"Something went wrong"}
        icon={faExclamationTriangle}
        style={{ width: "100%" }}
      >
        {errorMessage}
      </Callout>
      <Button
        text="Reload"
        onClick={resetError}
        icon={faRefresh}
        intent="secondary"
      />
    </Stack>
  );
};
