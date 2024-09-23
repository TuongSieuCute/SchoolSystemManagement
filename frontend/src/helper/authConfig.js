import { LogLevel } from "@azure/msal-browser";
export const msalConfig = {
    auth: {
        clientId: "74297c09-c115-4dd1-bc33-6c9edd12c742",
        authority: "https://login.microsoftonline.com/b1a9fdc0-1d56-4c3d-a481-809fff8a26db",
        redirectUri: window.location.href,
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: true,
    },
    system: {
        loggerOptions: {
            /**
             * logger callback
             * @param {LogLevel} level log level
             * @param {string} message message
             * @param {boolean} containsPii contains Pii
             * @returns void
             */
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        break;
                    case LogLevel.Warning:
                        console.warn(message);
                        break;
                    case LogLevel.Info:
                        console.info(message);
                        break;
                    case LogLevel.Verbose:
                        console.debug(message);
                        break;
                    default:
                        break;
                }
            }
        }
    }
}

export const loginRequest = {
    scopes: ['User.Read']
};

export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
}