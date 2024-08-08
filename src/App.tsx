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
import { useRegisterElements, useUnlinkContact, useUnlinkCompany } from "@/hooks";
import { isNavigatePayload, isUnlinkCompanyPayload } from "@/utils";
import { AppContainer } from "@/components/common";
import { ErrorFallback } from "@/components/ErrorFallback/ErrorFallback";
import {
  HomePage,
  LoadingPage,
  CompanyPage,
  CreateNotePage,
  OpportunityPage,
  LinkContactPage,
  EditContactPage,
  LinkCompanyPage,
  CompanyHomePage,
  CreateContactPage,
  CreateActivityPage,
  VerifySettingsPage,
  CreateOpportunityPage,
} from "@/pages";
import type { FC } from "react";
import type { EventPayload } from "./types";

const App: FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { client } = useDeskproAppClient();
  const { unlink, isLoading: isLoadingUnlink } = useUnlinkContact();
  const { unlinkCompany, isLoading: isLoadingUnlinkCompany } = useUnlinkCompany()
  const isAdmin = useMemo(() => pathname.includes("/admin/"), [pathname]);
  const isLoading = useMemo(() => {
    return !client || isLoadingUnlink || isLoadingUnlinkCompany
  }, [client, isLoadingUnlink, isLoadingUnlinkCompany]);

  useRegisterElements(({ registerElement }) => {
    registerElement("refresh", { type: "refresh_button" });
  });

  const debounceElementEvent = useDebouncedCallback((_, __, payload: EventPayload) => {
    return match(payload.type)
      .with("changePage", () => isNavigatePayload(payload) && navigate(payload.path))
      .with("unlink", unlink)
      .with("unlink_company", () => isUnlinkCompanyPayload(payload) && unlinkCompany(payload.company))
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
          <Route path="/contacts/:id/edit" element={<EditContactPage/>}/>
          <Route path="/opportunity/create" element={<CreateOpportunityPage/>}/>
          <Route path="/opportunity/:id" element={<OpportunityPage/>}/>
          <Route path="/notes/create" element={<CreateNotePage/>}/>
          <Route path="/activities/create" element={<CreateActivityPage/>}/>
          <Route path="/companies/link" element={<LinkCompanyPage/>}/>
          <Route path="/companies/home" element={<CompanyHomePage/>}/>
          <Route path="/companies/:id" element={<CompanyPage/>}/>
          <Route index element={<LoadingPage/>}/>
        </Routes>
      </ErrorBoundary>
    </AppContainer>
  );
}

export { App };
