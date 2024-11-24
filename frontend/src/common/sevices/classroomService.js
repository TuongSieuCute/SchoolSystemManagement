import { getApiUrl } from './environmentService';
import { getRequest } from './serviceBase';
/**
 * 
 * @param {{
 * date: string,
 * lessionStart: string,
 * lessionEnd: string,
 * typeRoom: string,
 * roomId: string
 * }} data 
 * @returns {Object}
 */
const apiUrl = getApiUrl();
export const searchClassroom = (data) => {
    const params = new URLSearchParams(data);
    return getRequest(`${apiUrl}/ClassRoom/Search?${params}`);
};

export const getClassrooms = ()=>{
    return getRequest(`${apiUrl}/ClassRoom`);
};