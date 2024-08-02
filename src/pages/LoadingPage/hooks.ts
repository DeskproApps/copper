import { useNavigate } from "react-router-dom";
import { useInitialisedDeskproAppClient } from "@deskpro/app-sdk";
import { getEntityListService, getCompanyListService } from "@/services/deskpro";
import { checkAuthService } from "@/services/copper";
import { useAsyncError, useDPContext } from "@/hooks";
import { tryToLinkAutomatically } from "@/utils";

type UseLoadingApp = () => void;

const useLoadingApp: UseLoadingApp = () => {
  const navigate = useNavigate();
  const { asyncErrorHandler } = useAsyncError();
  const { isUserCtx, dpUser, isOrgCtx, dpOrg } = useDPContext();

  useInitialisedDeskproAppClient((client) => {
    if (isUserCtx && dpUser) {
      checkAuthService(client)
      .then(() => tryToLinkAutomatically(client, dpUser))
      .then(() => getEntityListService(client, dpUser.id))
      .then((entityIds) => navigate(entityIds?.length ? "/home" : "/contacts/link"))
      .catch(asyncErrorHandler);
    }

    if (isOrgCtx && dpOrg) {
      checkAuthService(client)
        .then(() => getCompanyListService(client, dpOrg.id))
        .then((entityIds) => navigate(entityIds?.length ? "/companies/home" : "/companies/link"))
        .catch(asyncErrorHandler);
    }
  }, [isUserCtx, dpUser, isOrgCtx, dpOrg]);
};

export { useLoadingApp };
