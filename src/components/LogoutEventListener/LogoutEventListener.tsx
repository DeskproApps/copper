import { useLogoutEvent } from "@/hooks";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function LogoutEventListener() {
  const { logoutEvent, setLogoutEvent } = useLogoutEvent()
    const navigate = useNavigate()

  useEffect(() => {
    if (logoutEvent) {
      navigate("/login");

      // Reset the event so it's not triggered again
      setLogoutEvent(undefined);
    }
  }, [logoutEvent, navigate, setLogoutEvent]);

  return (<Outlet />)
}