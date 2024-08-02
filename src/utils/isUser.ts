import { isEmpty } from "lodash-es";
import type {
  Maybe,
  UserContext,
  OrganisationContext,
} from "@/types";

const isUser = (
  ctx: Maybe<UserContext|OrganisationContext>,
): ctx is UserContext => {
  return ctx?.type === "user" && !isEmpty((ctx.data as UserContext["data"])?.user);
};

export { isUser };
