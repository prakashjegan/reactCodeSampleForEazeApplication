const TOKEN_KEY = 'authenticated';

const authenticateUser = () => {
    localStorage.setItem(TOKEN_KEY, 'true');
};

const isAuthenticated = () => {
    if (localStorage.getItem(TOKEN_KEY)) {
        return true;
    } else {
        return false;
    }
};

export default {
    authenticateUser,
    isAuthenticated
};
