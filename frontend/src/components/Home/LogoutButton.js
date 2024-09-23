import { useMsal } from "@azure/msal-react"

export const LogOutButton = () => {
    const { instance } = useMsal();
    
    const logoutHandler = () => {
        instance.logoutPopup({
            postLogoutRedirectUri: "/",
            mainWindowRedirectUri: "/",
        })
    }

    return (
        <button onClick={logoutHandler}>Logout</button>
    )
}