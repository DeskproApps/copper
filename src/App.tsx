import { useMemo } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";
import { match } from "ts-pattern";
import { ErrorBoundary } from "react-error-boundary";
import {
  LoadingSpinner,
  useDeskproAppClient,
  useDeskproAppEvents,
} from "@deskpro/app-sdk";
import { useRegisterElements, useUnlinkContact } from "./hooks";
import { isNavigatePayload } from "./utils";
import { AppContainer } from "./components/common";
import { ErrorFallback } from "./components/ErrorFallback/ErrorFallback";
import {
  HomePage,
  LoadingPage,
  CreateNotePage,
  OpportunityPage,
  LinkContactPage,
  EditContactPage,
  CreateContactPage,
  VerifySettingsPage,
  CreateOpportunityPage,
} from "./pages";
import type { FC } from "react";
import type { EventPayload } from "./types";

const App: FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { client } = useDeskproAppClient();
  const { unlink, isLoading: isLoadingUnlink } = useUnlinkContact();
  const isAdmin = useMemo(() => pathname.includes("/admin/"), [pathname]);
  const isLoading = useMemo(() => {
    return !client || isLoadingUnlink
  }, [client, isLoadingUnlink]);

  useRegisterElements(({ registerElement }) => {
    registerElement("refresh", { type: "refresh_button" });
  });

  const debounceElementEvent = useDebouncedCallback((_, __, payload: EventPayload) => {
    return match(payload.type)
      .with("changePage", () => isNavigatePayload(payload) && navigate(payload.path))
      .with("unlink", unlink)
      .run();
  }, 500);

  useDeskproAppEvents({
    onShow: () => {
      client && setTimeout(() => client.resize(), 200);
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    onElementEvent: debounceElementEvent,
  }, [client]);

  if (isLoading) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
    <AppContainer isAdmin={isAdmin}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Routes>
          <Route path="/admin/verify_settings" element={<VerifySettingsPage/>}/>
          <Route path="/home" element={<HomePage/>}/>
          <Route path="/contacts/link" element={<LinkContactPage/>}/>
          <Route path="/contacts/create" element={<CreateContactPage/>}/>
          <Route path="/contacts/:id/edit/" element={<EditContactPage/>}/>
          <Route path="/opportunity/create" element={<CreateOpportunityPage/>}/>
          <Route path="/opportunity/:id" element={<OpportunityPage/>}/>
          <Route path="/notes/create" element={<CreateNotePage/>}/>
          <Route index element={<LoadingPage/>}/>
        </Routes>
      </ErrorBoundary>
    </AppContainer>
  );
}

export { App };
