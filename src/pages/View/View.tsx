import { useNavigate, useParams } from "react-router-dom";
import activityJson from "../../mapping/activity.json";
import opportunityJson from "../../mapping/opportunity.json";
import { useMemo } from "react";
import { getActivityById, getOpportunityById } from "../../api/api";
import {
  IDeskproClient,
  LoadingSpinner,
  useDeskproAppEvents,
  useInitialisedDeskproAppClient,
  useQueryWithClient,
} from "@deskpro/app-sdk";
import { FieldMapping } from "../../components/FieldMapping/FieldMapping";
import { APIArrayReturnTypes } from "../../api/types";
import { IJson } from "../../types/json";

export const View = () => {
  const { type, id } = useParams();

  const navigate = useNavigate();

  const [selectedJson, findFn] = useMemo(() => {
    switch (type) {
      case "activity":
        return [activityJson, getActivityById];
      case "opportunity":
        return [opportunityJson, getOpportunityById];
    }
  }, [type]) as [
    IJson,
    (client: IDeskproClient, id: string) => Promise<APIArrayReturnTypes>
  ];

  const dataQuery = useQueryWithClient(
    [type as string, id as string],
    (client) => findFn(client, id as string),
    {
      enabled: !!type && !!id,
    }
  );

  useInitialisedDeskproAppClient((client) => {
    client.registerElement("home", {
      type: "home_button",
    });
  });

  useDeskproAppEvents({
    async onElementEvent(id) {
      switch (id) {
        case "home":
          navigate("/redirect");
      }
    },
  });

  if (dataQuery.isLoading) return <LoadingSpinner />;

  return (
    <FieldMapping
      fields={[dataQuery.data] as unknown as []}
      metadata={selectedJson.view}
    />
  );
};
