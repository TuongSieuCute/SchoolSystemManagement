import { PublicClientApplication } from '@azure/msal-browser';

export const msalConfig = {
    auth: {
        clientId: '74297c09-c115-4dd1-bc33-6c9edd12c742',
        authority: 'https://login.microsoftonline.com/b1a9fdc0-1d56-4c3d-a481-809fff8a26db',
        redirectUri: 'http://localhost:3000',
    },
    cache: {
        cacheLocation: 'sessionStorage',
        storeAuthStateInCookie: true,
    },
};

export const scopes = {
    microsoft: ['User.Read'],
    api: ['api://74297c09-c115-4dd1-bc33-6c9edd12c742/Default']
};

export const graphConfig = {
    endPoint: 'https://graph.microsoft.com/v1.0/me',
};

export const msalInstance = new PublicClientApplication(msalConfig);
