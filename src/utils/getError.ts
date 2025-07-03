import { get } from "lodash";
import { CopperError } from "@/services/copper";
import { DEFAULT_ERROR } from "@/constants";

const getError = (error: Error) => {
  if (error instanceof CopperError) {
    return get(error, ["data", "message"]) || DEFAULT_ERROR;
  }

  let parsedMessage;
  let parsedError;

  try {
    parsedMessage = JSON.parse(get(error, ["message"]));
    parsedError = JSON.parse(get(parsedMessage, ["message"]));
  } catch (e) {
    //..
  }

  return get(parsedError, ["message"])
    || get(parsedError, ["error"])
    || DEFAULT_ERROR;
};

export { getError };
