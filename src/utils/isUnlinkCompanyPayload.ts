import type { Maybe, EventPayload, UnlinkCompanyPayload } from "@/types";

const isUnlinkCompanyPayload = (
  payload?: Maybe<EventPayload>,
): payload is UnlinkCompanyPayload => {
  return payload?.type === "unlink_company" && !!payload.company;
};

export { isUnlinkCompanyPayload };
