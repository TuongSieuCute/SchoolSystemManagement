import { getApiUrl } from './environmentService';
import { getRequest } from './serviceBase';
export const getTrainingProgram = () => {
    const apiUrl = getApiUrl();
    return getRequest(apiUrl + '/TrainingProgramCourse');
};