import { getRequest } from './serviceBase';

export const getCourseRegistration = () => {
    return getRequest('https://localhost:7074/api/CourseRegistration');
};