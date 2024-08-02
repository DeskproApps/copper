import { isEmpty } from "lodash-es";
import type {
  Maybe,
  UserContext,
  OrganisationContext,
} from "@/types";

const isOrganisation = (
  ctx: Maybe<UserContext|OrganisationContext>,
): ctx is OrganisationContext => {
  return ctx?.type === "organisation"
    && !isEmpty((ctx.data as OrganisationContext["data"])?.organisation);
};

export { isOrganisation };
