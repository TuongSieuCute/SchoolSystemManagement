import { useMsal } from "@azure/msal-react"
import { loginRequest } from "../../helper/authConfig";

export const LoginButton = () => {
    const { instance } = useMsal();

    const loginHandler = async () => {
        await instance.loginPopup(loginRequest)
    }
    return (
        <button onClick={loginHandler}>Login with Azure</button>
    );
}