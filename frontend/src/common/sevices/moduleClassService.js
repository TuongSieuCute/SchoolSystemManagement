import { getRequest } from './serviceBase';

export const getSubjects = () => {
    return getRequest('https://localhost:7074/api/ModuleClass/subject');
};