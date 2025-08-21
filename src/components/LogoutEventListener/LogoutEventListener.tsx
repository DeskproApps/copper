import { useLogoutEvent } from "@/hooks";
import { Dispatch, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function LogoutEventListener() {
  const { logoutEvent, setLogoutEvent } = useLogoutEvent()

  return (<>
    <Outlet />
    <NavToLogin
      logoutEvent={logoutEvent ?? false}
      setLogoutEvent={setLogoutEvent}
    />
  </>)
}

interface NavToLoginProps {
  logoutEvent: boolean
  setLogoutEvent: Dispatch<React.SetStateAction<boolean | undefined>>
}
function NavToLogin(props: Readonly<NavToLoginProps>) {
  const { logoutEvent, setLogoutEvent } = props
  const navigate = useNavigate()

  useEffect(() => {
    if (logoutEvent === true) {
      // The login page resets the event.
      navigate("/login");
    }
  }, [logoutEvent, navigate, setLogoutEvent]);


  logoutEvent

  return <></>
}