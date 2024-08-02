import { useState, useCallback } from "react";
import { isEmpty } from "lodash-es";
import { useNavigate } from "react-router-dom";
import { useDeskproAppClient, useDeskproLatestAppContext } from "@deskpro/app-sdk";
import { getEntityListService, deleteEntityService } from "@/services/deskpro";
import { useAsyncError } from "@/hooks";
import type { UserContext } from "@/types";

export type Result = {
  isLoading: boolean;
  unlink: () => void;
};

type UseUnlinkContact = () => Result;

const useUnlinkContact: UseUnlinkContact = () => {
  const navigate = useNavigate();
  const { client } = useDeskproAppClient();
  const { context } = useDeskproLatestAppContext() as { context?: UserContext };
  const { asyncErrorHandler } = useAsyncError();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dpUserId = context?.data?.user?.id;

  const unlink = useCallback(() => {
    if (!client || !dpUserId) {
      return;
    }

    setIsLoading(true);

    return getEntityListService(client, dpUserId)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then<any>((ids) => {
        return isEmpty(ids)
          ? Promise.resolve()
          : Promise.all(ids.map((entityId) => deleteEntityService(client, dpUserId, entityId)));
      })
      .then(() => navigate("/contacts/link"))
      .catch(asyncErrorHandler)
      .finally(() => setIsLoading(false))
  }, [client, dpUserId, navigate, asyncErrorHandler]);

  return { isLoading, unlink };
};

export { useUnlinkContact };
