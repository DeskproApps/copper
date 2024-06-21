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
};

export { queryClient, QueryKey };
