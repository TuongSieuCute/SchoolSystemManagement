export const getUserInfoLocal = () => {
    return {
        token: localStorage.getItem('token'),
        role: localStorage.getItem('role'),
        username: localStorage.getItem('username'),
        loginMethod: 'local'
    };
};

export const getUserInfoAzure = () => {
    return {
        role: localStorage.getItem('role'),
        username: localStorage.getItem('username'),
        loginMethod: 'azure'
    }; 
};