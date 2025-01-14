import { getApiUrl } from './environmentService';
import { getRequest } from './serviceBase';

export const getCourseRegistration = () => {
    const apiUrl = getApiUrl();
    return getRequest(apiUrl + '/CourseRegistration');
};