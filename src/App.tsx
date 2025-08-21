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
import { useLogout, useRegisterElements, useUnlink } from "./hooks";
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
import type { EventPayload, Settings, UserData } from "./types";
import { ErrorBoundary } from "@sentry/react";
import { CompanyDetailsPage, HandleCompanyLinkPage, LinkCompaniesPage } from "./pages/companies";
import { LogoutEventListener } from "./components";

const App: FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { client } = useDeskproAppClient();
  const { unlink, isLoading: isLoadingUnlink } = useUnlink()
  const { logoutActiveUser } = useLogout()
  const { context } = useDeskproLatestAppContext<UserData, Settings>()

  const isUsingOAuth = context?.settings?.use_api_key === false || context?.settings?.use_advanced_connect === false;

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
          <Route element={<LogoutEventListener />}>
            {/* Routes that require authentication (pretty much all routes besides login) should go here. */}
            <Route path="admin" >
              <Route path="verify_settings" element={<VerifySettingsPage />} />
              <Route path="callback" element={<AdminCallbackPage />} />
            </Route>

            <Route path="contacts" >
              <Route path="link" element={<LinkContactPage />} />
              <Route path="create" element={<CreateContactPage />} />
              <Route path=":id" >
                <Route path="edit" element={<EditContactPage />} />
              </Route>
            </Route>

            <Route path="opportunity" >
              <Route path="create" element={<CreateOpportunityPage />} />
              <Route path=":id" >
                <Route index element={<OpportunityPage />} />
              </Route>
            </Route>

            <Route path="/home" element={<HomePage />} />


            <Route path="notes" >
              <Route path="create" element={<CreateNotePage />} />
            </Route>

            <Route path="activities" >
              <Route path="create" element={<CreateActivityPage />} />
            </Route>

            <Route path="companies">
              <Route index element={<HandleCompanyLinkPage />} />
              <Route path="link" element={<LinkCompaniesPage />} />
              <Route path=":companyId" >
                <Route index element={<CompanyDetailsPage />} />
              </Route>
            </Route>
          </Route>

          <Route path="/login" element={<LoginPage />} />
          <Route index element={<LoadingPage />} />
        </Routes>
      </ErrorBoundary>
    </AppContainer>
  );
}

export { App };
