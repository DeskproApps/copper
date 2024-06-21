import { has } from "lodash";
import type { Maybe, EventPayload, NavigateToChangePage } from "../types";

const isNavigatePayload = (
  payload?: Maybe<EventPayload>,
): payload is NavigateToChangePage => {
  return has(payload, ["path"]);
};

export { isNavigatePayload };
