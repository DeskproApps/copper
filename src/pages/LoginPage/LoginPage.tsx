import { AnchorButton, H3, Stack } from "@deskpro/deskpro-ui"
import { FC, useEffect } from "react"
import { useDeskproElements, useInitialisedDeskproAppClient } from "@deskpro/app-sdk"
import { useLogoutEvent } from "@/hooks"
import Callout from "@/components/Callout"
import useLogin from "./useLogin"

const LoginPage: FC = () => {
    useDeskproElements(({ registerElement, clearElements }) => {
        clearElements()
        registerElement("refresh", { type: "refresh_button" })
    })

    useInitialisedDeskproAppClient((client) => {
        client.setTitle("Login")
    }, [])

    const { logoutEvent, setLogoutEvent } = useLogoutEvent()

    useEffect(() => {
        if (logoutEvent) {
            setLogoutEvent(undefined)
        }

    }, [logoutEvent, setLogoutEvent])


    const { onSignIn, authUrl, isLoading, error } = useLogin();

    return (
        <Stack padding={12} vertical gap={12} role="alert">
            <H3>Log into your Copper account.</H3>
            <AnchorButton
                disabled={!authUrl || isLoading}
                href={authUrl || "#"}
                loading={isLoading}
                onClick={onSignIn}
                target={"_blank"}
                text={"Log In"}
            />

            {error && (
                <Callout
                    accent="red"
                    style={{ width: "100%" }}
                >
                    {/* {errorMessage} */}
                    {error}
                </Callout>
            )}
        </Stack>
    )
}

export default LoginPage