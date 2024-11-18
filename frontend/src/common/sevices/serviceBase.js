import { msalInstance, scopes } from '../../helper/authConfig';

export const getRequest = (url) => {
    return sendRequest(url, 'GET');
};

export const postRequest = (url, body) => {
    return sendRequest(url, 'POST', body);
};

/**
 * 
 * @param {string} url request url
 * @param {'GET' | 'POST' | 'PUT' | 'DELETE'} method 
 * @param {Object} body 
 * @returns 
 */
const sendRequest = async (url, method, body) => {
    const headers = await getHeaders();

    const options = {
        headers,
        method,
    };
    if (body) {
        options.body = body;
    }
    return await fetch(url, {
        headers,
        method,
        body,
    });
};

const getHeaders = async () => {
    const token = await getIdToken();
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${token}`);
    return headers;
};

const getToken = async () => {
    await msalInstance.initialize();
    const account = msalInstance.getAllAccounts()[0];
    const accessTokenRequest = {
        scope: scopes.api,
        account,
    };
    return await msalInstance.acquireTokenSilent(accessTokenRequest);
};

export const getIdToken = async () => {
    const token = await getToken();
    return token.idToken;
};

export const getAccessToken = async () => {
    const token = await getToken();
    return token.accessToken;
};