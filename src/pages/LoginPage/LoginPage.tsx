import { AnchorButton, H3, Stack } from "@deskpro/deskpro-ui"
import { ErrorBlock } from "../../components/common"
import { FC } from "react"
import { useDeskproElements, useInitialisedDeskproAppClient } from "@deskpro/app-sdk"
import useLogin from "./useLogin"

const LoginPage: FC = () => {
    useDeskproElements(({ registerElement, clearElements }) => {
        clearElements()
        registerElement("refresh", { type: "refresh_button" })
    })

    useInitialisedDeskproAppClient((client)=>{
        client.setTitle("Login")
    }, [])

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

            {error && (<div style={{width: "100%"}}><ErrorBlock text={error}/></div>)}
        </Stack>
    )
}

export default LoginPage