import { getApiUrl } from './environmentService';
import { getRequest } from './serviceBase';

export const getSubject = () => {
    const apiUrl = getApiUrl();
    return getRequest(apiUrl + '/Subject');
};