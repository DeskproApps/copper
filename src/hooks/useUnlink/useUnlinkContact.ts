import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDeskproAppClient, useDeskproLatestAppContext } from "@deskpro/app-sdk";
import {clearLinkedEntities } from "../../services/deskpro";
import type { Settings, UserData } from "../../types";

export type Result = {
  isLoading: boolean;
  unlink: () => void;
};

export default function useUnlink(): Result {
  const navigate = useNavigate();
  const { client } = useDeskproAppClient();
  const { context } = useDeskproLatestAppContext<UserData, Settings>()
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const unlink = useCallback(() => {
    if (!client) {
      return;
    }

    setIsLoading(true);

    const isOrgView = Boolean(context?.data?.organisation)

    if (isOrgView) {

      if (!context?.data?.organisation) {
        setIsLoading(false)
        return
      }

      void clearLinkedEntities(client, { type: "organisation", id: context?.data?.organisation.id })
        .then(() => {
          navigate("/companies/link")
        })
      setIsLoading(false)
      return
    }

    if (!context?.data?.user) {
      setIsLoading(false)
      return
    }

    void clearLinkedEntities(client, { type: "user", id: context?.data?.user.id })
      .then(() => {
        navigate("/contacts/link")
      })

      setIsLoading(false)
  }, [client, context?.data?.organisation, context?.data?.user, navigate]);

  return { isLoading, unlink };
};

