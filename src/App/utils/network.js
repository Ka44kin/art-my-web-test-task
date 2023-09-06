const API_BASE_URL = 'https://gorest.co.in/public/v1';
const API_USERS = '/users';

export const USERS_URL = API_BASE_URL+API_USERS;


export const getApiResource = async (url) => {
    try {
        const response = await fetch (url);
        const result = await response.json();

        return {
            users: result.data,
            pagination: result.meta.pagination
        }
    } catch (error){
        console.error('Could not fetch.' , error.message);
        return false;
    }   
};

