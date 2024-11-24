import { getApiUrl } from './environmentService';
import { getRequest, postRequest } from './serviceBase';

export const getSubjects = () => {
    const apiUrl = getApiUrl();
    return getRequest(apiUrl + '/ModuleClass/subject');
};

export const addModuleClass = (moduleClass) => {
    const apiUrl = getApiUrl();
    return postRequest(apiUrl, moduleClass);
};