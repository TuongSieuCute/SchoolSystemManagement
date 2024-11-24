import { graphConfig } from '../../helper/authConfig';
import { msalInstance } from './../../helper/authConfig';
import { getAccessToken } from './serviceBase';

export const getUsername = () => {
    return msalInstance.getAllAccounts()[0]?.username;
};
export const getProfilePicture = async () => {
    const headers = new Headers();
    const accessToken = await getAccessToken();
    headers.append('Authorization', `Bearer ${accessToken}`);
    const response = await fetch(`${graphConfig.endPoint}/photo/$value`,
        {
            method: 'GET',
            headers
        }
    );
    if (response.ok) {
        const blob = await response.blob();
        return convertPhotoToString(blob);
    }
    return null;
};
/**
 * @param {Blob} blob
 */
const convertPhotoToString = (blob) => {
    const url = URL.createObjectURL(blob);
    return url;
};

export const getUserId = () => {
    // username is account's email
    const username = getUsername();
    if (!username) {
        return null;
    }
    const id = username.substring(0, username.indexOf('@'));
    // student id
    if (/^\d+$/.test(id)) {
        const studentId = id.replace(/(\d{2})(\d{2})(\d{3})(\d{3})/, '$1.$2.$3.$4');
        return studentId;
    }
    return username;
};
