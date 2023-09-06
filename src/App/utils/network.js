export const GOREST_ROOT = 'https://gorest.co.in/public/v1/users';

export const getApiResource = async (url) => {
    try {
        const response = await fetch (url);
        const result = await response.json();

        console.log(result);

        return {
            users: result.data,
            pagination: result.meta.pagination
        }
    } catch (error){
        console.error('Could not fetch.' , error.message);
        return false;
    }   
};

