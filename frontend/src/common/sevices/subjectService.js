import { getApiUrl } from './environmentService';
export const getCourses = (trainingProgramId) => {
    const apiUrl = getApiUrl();
    const params = new URLSearchParams({
        trainingProgramId
    });
    return fetch(`${apiUrl}/subject?${params}`);
};