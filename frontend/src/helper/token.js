export const getUserInfoAzure = () => {
    return {
        role: localStorage.getItem('role'),
        username: localStorage.getItem('username'),
    }; 
};