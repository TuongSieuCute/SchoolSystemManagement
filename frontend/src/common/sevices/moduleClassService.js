import { getApiUrl } from './environmentService';
import { getRequest } from './serviceBase';

export const getModuleClass = () => {
    const apiUrl = getApiUrl();
    return getRequest(apiUrl + '/ModuleClass');
};
