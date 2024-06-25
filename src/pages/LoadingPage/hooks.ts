import { useMemo } from "react";
import { get, size, isEmpty } from "lodash";
import { useNavigate } from "react-router-dom";
import {
  useDeskproLatestAppContext,
  useInitialisedDeskproAppClient,
} from "@deskpro/app-sdk";
import { getEntityListService } from "../../services/deskpro";
import { checkAuthService } from "../../services/copper";
import { useAsyncError } from "../../hooks";
import { tryToLinkAutomatically } from "../../utils";
import type { UserContext } from "../../types";

type UseLoadingApp = () => void;

const useLoadingApp: UseLoadingApp = () => {
  const navigate = useNavigate();
  const { context } = useDeskproLatestAppContext() as { context: UserContext };
  const { asyncErrorHandler } = useAsyncError();
  const dpUser = useMemo(() => get(context, ["data", "user"]), [context]);

  useInitialisedDeskproAppClient((client) => {
    if (isEmpty(dpUser)) {
      return;
    }

    checkAuthService(client)
      .then(() => tryToLinkAutomatically(client, dpUser))
      .then(() => getEntityListService(client, dpUser.id))
      .then((entityIds) => navigate(size(entityIds) ? "/home" : "/contacts/link"))
      .catch(asyncErrorHandler);
  }, [dpUser]);
};

export { useLoadingApp };
