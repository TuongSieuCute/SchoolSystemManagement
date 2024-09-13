export const getUserInfo = () => {
    return {
        token: localStorage.getItem('token'),
        role: localStorage.getItem('role'),
        username: localStorage.getItem('username')
    };
};