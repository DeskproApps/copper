import { IDeskproClient, proxyFetch } from "@deskpro/app-sdk";
import {
  IActivity,
  IActivityNote,
  IContact,
  IOpportunity,
  IPipelineStage,
  IUser,
  RequestMethod,
  IActivityType,
} from "./types";

export const getActivitiesByContactId = (
  client: IDeskproClient,
  contactId: IContact["id"],
): Promise<IActivity[]> => {
  return installedRequest(client, `people/${contactId}/activities`, "POST");
};

export const getOpportunitiesByContactId = async (
  client: IDeskproClient,
  contactId: IContact["id"],
): Promise<IOpportunity[]> => {
  const opportunities: IOpportunity[] = (
    (await installedRequest(client, `opportunities/search`, "POST", {
      custom_fields: [
        {
          custom_field_definition_id: contactId,
        },
      ],
    })) as IOpportunity[]
  ).filter((e) => e.primary_contact_id === contactId);

  const pipelineStates = await getPipelineStages(client);

  const users = await getUsers(client);

  return opportunities.map((e) => ({
    ...e,
    pipeline_stage_name: pipelineStates.find(
      (item) => item.id === e.pipeline_stage_id
    )?.name,
    assignee_name: users.find((item) => item.id === e.assignee_id)?.name,
  }));
};

export const getAccount = async (
  client: IDeskproClient
): Promise<{ id: string }> => {
  return installedRequest(client, `account`, "GET");
};

export const getUsers = async (client: IDeskproClient): Promise<IUser[]> => {
  return await installedRequest(client, `users`, "GET");
};

export const getPipelineStages = async (
  client: IDeskproClient
): Promise<IPipelineStage[]> => {
  return await installedRequest(client, `pipeline_stages`, "GET");
};

export const getOpportunityById = async (
  client: IDeskproClient,
  id: IOpportunity["id"],
): Promise<IOpportunity> => {
  const opportunity = await installedRequest(
    client,
    `opportunities/${id}`,
    "GET"
  );

  const pipelineStates = await getPipelineStages(client);

  const users = await getUsers(client);

  const pipelines = await getPipelines(client);

  opportunity.pipeline_stage_name = pipelineStates.find(
    (item) => item.id === opportunity.pipeline_stage_id
  )?.name;

  opportunity.pipeline_name = pipelines.find(
    (item) => item.id === opportunity.pipeline_id
  )?.name;

  opportunity.assignee_name = users.find(
    (item) => item.id === opportunity.assignee_id
  )?.name;

  return opportunity;
};

export const getPipelines = async (
  client: IDeskproClient
): Promise<IPipelineStage[]> => {
  return await installedRequest(client, `pipelines`, "GET");
};

export const getActivityById = (
  client: IDeskproClient,
  id: string
): Promise<IActivityNote> => {
  return installedRequest(client, `activities/${id}`, "GET");
};

export const getContactById = (
  client: IDeskproClient,
  id: IContact["id"],
): Promise<IContact> => {
  return installedRequest(client, `people/${id}`, "GET");
};

export const getContactsByEmail = async (
  client: IDeskproClient,
  email: string
): Promise<IContact | null> => {
  const contact = await installedRequest(
    client,
    `people/fetch_by_email`,
    "POST",
    {
      email,
    }
  );

  if (!contact) {
    return null;
  }

  const owner = await installedRequest(
    client,
    `users/${contact.assignee_id}`,
    "GET"
  );

  contact.assignee_name = owner.name;

  return contact;
};

export const getActivityTypes = (
  client: IDeskproClient,
): Promise<{ user: IActivityType[] }> => {
  return installedRequest(client, "activity_types", "GET");
};

const installedRequest = async (
  client: IDeskproClient,
  endpoint: string,
  method: RequestMethod,
  data?: unknown
) => {
  const fetch = await proxyFetch(client);

  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-PW-Application": "developer_api",
      "X-PW-AccessToken": "__api_key__",
      "X-PW-UserEmail": "__api_key_owner_email__",
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(
    `https://api.copper.com/developer_api/v1/${endpoint.trim()}`,
    options
  );

  if (response.status === 404 && endpoint.includes("people")) {
    return null;
  }

  if (isResponseError(response)) {
    throw new Error(
      JSON.stringify({
        status: response.status,
        message:
          endpoint === "people/fetch_by_email"
            ? "Contact not found."
            : await response.text(),
      })
    );
  }

  return response.json();
};

export const isResponseError = (response: Response) =>
  response.status < 200 || response.status >= 400;
