import { useMemo } from "react";
import { get, isEmpty } from "lodash";
import { useNavigate } from "react-router-dom";
import {
  useDeskproLatestAppContext,
  useInitialisedDeskproAppClient,
} from "@deskpro/app-sdk";
import { useAsyncError } from "../../hooks";
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

    Promise.resolve(client)
      .then(() => navigate("/home"))
      .catch(asyncErrorHandler)
  }, [dpUser]);
};

export { useLoadingApp };
