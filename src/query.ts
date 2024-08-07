import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: false,
      useErrorBoundary: true,
      refetchOnWindowFocus: false,
      retry: 1,
      retryDelay: 1500,
    },
  },
});

const QueryKey = {
  SEARCH: "search",
  ACCOUNT: "account",
  CONTACT: "contact",
  LINKED_CONTACT: "linked_contact",
  CONTACT_TYPES: "contact_types",
  PIPELINES: "pipelines",
  PIPELINE_STAGES: "pipeline_stages",
  OPPORTUNITY: "opportunity",
  OPPORTUNITIES: "opportunities",
  ACTIVITY_TYPES: "activityTypes",
  ACTIVITIES: "activities",
  USERS: "users",
};

export { queryClient, QueryKey };
