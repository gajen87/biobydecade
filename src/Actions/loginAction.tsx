import { doLoginPost } from '../utils/httpRequest';
import { ENDPOINTS } from '../utils/appEndpoints'
export const USER_DETAILS = "USER_DETAILS";
export const USER_DETAILS_SUCCESS = "USER_DETAILS_SUCCESS";
export const USER_DETAILS_FAILURE = "USER_DETAILS_FAILURE";

export const SIGNUPUSER = "SIGNUPUSER";
export const SIGNUPUSER_SUCCESS = "SIGNUPUSER_SUCCESS";
export const SIGNUPUSER_FAILURE = "SIGNUPUSER_FAILURE";

export const FORGOTPASSWORD = "SIGNUPUSER";
export const FORGOTPASSWORD_SUCCESS = "SIGNUPUSER_SUCCESS";
export const FORGOTPASSWORD_FAILURE = "SIGNUPUSER_FAILURE";

export const RESET_PASSWORD_LINK = "RESET_PASSWORD_LINK";
export const RESET_PASSWORD_LINK_SUCCESS = "RESET_PASSWORD_LINK_SUCCESS";
export const RESET_PASSWORD_LINK_FAILURE = "RESET_PASSWORD_LINK_FAILURE";

export const POST_CHANGE_PASSWORD = "POST_CHANGE_PASSWORD";
export const POST_CHANGE_PASSWORD_SUCCESS = "POST_CHANGE_PASSWORD_SUCCESS";
export const POST_CHANGE_PASSWORD_FAILURE = "POST_CHANGE_PASSWORD_FAILURE";


/**
 * action to post user credentials
 * @param(@userDetails)
 */
export const loginUser = (userDetails) => {
    const request = doLoginPost({ url: ENDPOINTS.LOGINUSER1, data: userDetails });
    return {
        type: USER_DETAILS,
        payload: request
    };
}

/**
 * action to save user credentials
 */
export const loginUserSuccess = (userDetails) => {
    return {
        type: USER_DETAILS_SUCCESS,
        payload: userDetails
    };
}

export const loginUserFailure = (err) => {
    return {
        type: USER_DETAILS_FAILURE,
        payload: err
    };
}

/**
 * 
 * @param signUpDetails 
 */

export const forgotPassword = (userEmail) => {
    const request = doLoginPost({ url: ENDPOINTS.FORGOTPASSWORD, data: userEmail });
    return {
        type: FORGOTPASSWORD,
        payload: request
    };
}

/**
 * action to save user credentials
 */
export const forgotPasswordSuccess = (userDetails) => {
    return {
        type: FORGOTPASSWORD_SUCCESS,
        payload: userDetails
    };
}

export const forgotPasswordFailure = (err) => {
    return {
        type: FORGOTPASSWORD_FAILURE,
        payload: err
    };
}

export const signUpUser = (signUpDetails) => {
    const request = doLoginPost({ url: ENDPOINTS.SIGNUP, data: signUpDetails });
    return {
        type: SIGNUPUSER,
        payload: request,
    };
}

export const signUpUserSuccess = (signUpDetails) => {
    return {
        type: SIGNUPUSER_SUCCESS,
        payload: signUpDetails

    };
}

export const signUpUserFailure = (error) => {
    return {
        type: SIGNUPUSER_FAILURE,
        payload: error
    };
}

/**Reset password link check */

export const postResetPasswordLink = (signUpDetails) => {
    const request = doLoginPost({ url: ENDPOINTS.RESETLINKCHECK, data: signUpDetails });
    return {
        type: RESET_PASSWORD_LINK,
        payload: request,
    };
}

export const postResetPasswordLinkSuccess = (signUpDetails) => {
    return {
        type: RESET_PASSWORD_LINK_SUCCESS,
        payload: signUpDetails

    };
}

export const postResetPasswordLinkFailure = (error) => {
    return {
        type: RESET_PASSWORD_LINK_FAILURE,
        payload: error
    };
}

/**Post change passsword */

export const postChangePassword = (signUpDetails) => {
    const request = doLoginPost({ url: ENDPOINTS.POST_RESET_PASSWORD, data: signUpDetails });
    return {
        type: POST_CHANGE_PASSWORD,
        payload: request,
    };
}

export const postChangePasswordSuccess = (signUpDetails) => {
    return {
        type: POST_CHANGE_PASSWORD_SUCCESS,
        payload: signUpDetails

    };
}

export const postChangePasswordFailure = (error) => {
    return {
        type: POST_CHANGE_PASSWORD_FAILURE,
        payload: error
    };
}


