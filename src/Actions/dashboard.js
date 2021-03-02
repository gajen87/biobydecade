import { doActiongetDevCore, doLoginPost } from '../utils/httpRequest';
import { ENDPOINTS } from '../utils/appEndpoints';

export const GETUSERSLIST = "GETUSERSLIST";
export const GETUSERSLISTSUCCESS = "GETUSERSLISTSUCCESS";
export const GETUSERSLISTFAILURE = "GETUSERSLISTFAILURE";

export const getUsers = () => {
    const request = doActiongetDevCore({ url: ENDPOINTS.USER_BIO });
    return {
        type: GETUSERSLIST,
        payload: request
    };
}

/**
 * action to save user credentials
 */
export const getUsersSuccess = (data) => {
    return {
        type: GETUSERSLISTSUCCESS,
        payload: data
    };
}

export const getUsersFailure = (err) => {
    return {
        type: GETUSERSLISTFAILURE,
        payload: err
    };
}
