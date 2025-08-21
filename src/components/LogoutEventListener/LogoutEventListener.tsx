import { useLogoutEvent } from "@/hooks";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function LogoutEventListener() {
  const { logoutEvent, setLogoutEvent } = useLogoutEvent()
  const navigate = useNavigate()

  useEffect(() => {
    if (logoutEvent === true) {
      // The login page resets the event.
      navigate("/login");
    }
  }, [logoutEvent, navigate, setLogoutEvent]);

  return (<>
    <Outlet />
  </>)
}
