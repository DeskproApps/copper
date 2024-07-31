import { useState, useEffect } from "react";
import { useDeskproLatestAppContext } from "@deskpro/app-sdk";
import { isUser, isOrganisation } from "@/utils";
import type {
  Maybe,
  DPUser,
  UserContext,
  DPOrganisation,
  OrganisationContext,
} from "@/types";

export type Result = {
  isUserCtx: boolean;
  isOrgCtx: boolean;
  dpUser: Maybe<DPUser>;
  dpOrg: Maybe<DPOrganisation>;
};

export type UseDPContext = () => Result;

const useDPContext: UseDPContext = () => {
  const { context } = useDeskproLatestAppContext() as { context?: UserContext|OrganisationContext };
  const [isUserCtx, setIsUserCtx] = useState<boolean>(false);
  const [isOrgCtx, setIsOrgCtx] = useState<boolean>(false);
  const [dpUser, setDPUser] = useState<Maybe<DPUser>>(null);
  const [dpOrg, setDPOrg] = useState<Maybe<DPOrganisation>>(null);

  useEffect(() => {
    if (isUser(context)) {
      setIsUserCtx(true);
      setDPUser(context?.data?.user);
    } else if (isOrganisation(context)) {
      setIsOrgCtx(true);
      setDPOrg(context?.data?.organisation);
    } else {
      setIsUserCtx(false);
      setIsOrgCtx(false);
      setDPUser(null);
      setDPOrg(null);
    }
  }, [context]);

  return { isUserCtx, isOrgCtx, dpUser, dpOrg };
};

export { useDPContext};
