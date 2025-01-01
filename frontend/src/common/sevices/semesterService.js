import { getApiUrl } from './environmentService';
import { getRequest } from './serviceBase';

export const getSemester = () => {
    const apiUrl = getApiUrl();
    return getRequest(apiUrl + '/Semester');
};