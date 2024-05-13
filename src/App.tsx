import { useMemo } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useRegisterElements } from "./hooks";
import { useDeskproAppEvents } from "@deskpro/app-sdk";
import {
  VerifySettingsPage,
  HomePage,
  LoadingPage,
  OpportunityPage,
} from "./pages";

const App = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isAdmin = useMemo(() => pathname.includes("/admin/"), [pathname]);

  useRegisterElements(({ registerElement }) => {
    registerElement("refresh", { type: "refresh_button" });
  });

  useDeskproAppEvents({
    async onElementEvent(id) {
      switch (id) {
        case "home":
          navigate("/home");
      }
    },
  }, [navigate]);

  return (
    <>
      <Routes>
        <Route path="/admin/verify_settings" element={<VerifySettingsPage/>}/>
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/opportunity/:id" element={<OpportunityPage/>}/>
        <Route index element={<LoadingPage/>}/>
      </Routes>
      {!isAdmin && (<><br/><br/><br/></>)}
    </>
  );
}

export { App };
