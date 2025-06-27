import { useMemo } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";
import { match } from "ts-pattern";
import {
  LoadingSpinner,
  useDeskproAppClient,
  useDeskproAppEvents,
  useDeskproLatestAppContext,
} from "@deskpro/app-sdk";
import { useLogout, useRegisterElements, useUnlinkContact } from "./hooks";
import { isNavigatePayload } from "./utils";
import { AppContainer } from "./components/common";
import { ErrorFallback } from "./components/ErrorFallback/ErrorFallback";
import {
  AdminCallbackPage,
  CreateActivityPage,
  CreateContactPage,
  CreateNotePage,
  CreateOpportunityPage,
  EditContactPage,
  HomePage,
  LinkContactPage,
  LoadingPage,
  LoginPage,
  OpportunityPage,
  VerifySettingsPage,
} from "./pages";
import type { FC } from "react";
import type { EventPayload, Settings } from "./types";
import { ErrorBoundary } from "@sentry/react";

const App: FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { client } = useDeskproAppClient();
  const { unlink, isLoading: isLoadingUnlink } = useUnlinkContact()
  const { logoutActiveUser } = useLogout()
  const { context } = useDeskproLatestAppContext<unknown, Settings>()

  const isUsingOAuth = context?.settings.use_api_key === false || context?.settings.use_advanced_connect === false;

  const isAdmin = pathname.includes("/admin/");
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
      .with("logout", () => {
        if (isUsingOAuth) {
          logoutActiveUser()
        }
      })
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
      <LoadingSpinner />
    );
  }

  return (
    <AppContainer isAdmin={isAdmin}>
      <ErrorBoundary fallback={ErrorFallback}>
        <Routes>
          <Route path="/admin/verify_settings" element={<VerifySettingsPage />} />
          <Route path="/admin/callback" element={<AdminCallbackPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/contacts/link" element={<LinkContactPage />} />
          <Route path="/contacts/create" element={<CreateContactPage />} />
          <Route path="/contacts/:id/edit" element={<EditContactPage />} />
          <Route path="/opportunity/create" element={<CreateOpportunityPage />} />
          <Route path="/opportunity/:id" element={<OpportunityPage />} />
          <Route path="/notes/create" element={<CreateNotePage />} />
          <Route path="/activities/create" element={<CreateActivityPage />} />

          <Route path="organisations">
            <Route index element={<>Should redirect to the :orgId page</>} />
            <Route path="link" element={<>I LINK ORGS</>} />
            <Route path=":organisationId" >
              <Route index element={<>The org details</>} />
            </Route>
          </Route>

          <Route index element={<LoadingPage />} />
        </Routes>
      </ErrorBoundary>
    </AppContainer>
  );
}

export { App };
