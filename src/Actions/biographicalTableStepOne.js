import { doActionDelDevCore, doActionDevCore, doActiongetDevCore, doActionPostDevCore, doActionPutDevCore, doLoginPost } from '../utils/httpRequest';
import { ENDPOINTS } from '../utils/appEndpoints';

export const GET_USERBIO = "GET_USERBIO";
export const GET_USERBIO_SUCCESS = "GET_USERBIO_SUCCESS";
export const GET_USERBIO_FAILURE = "GET_USERBIO_FAILURE";

export const GET_USER_BYID = "GET_USER_BYID";
export const GET_USER_BYID_SUCCESS = "GET_USER_BYID_SUCCESS";
export const GET_USER_BYID_FAILURE = "GET_USER_BYID_FAILURE";

export const POST_USERBIO = "POST_USERBIO";
export const POST_USERBIO_SUCCESS = "POST_USERBIO_SUCCESS";
export const POST_USERBIO_FAILURE = "POST_USERBIO_FAILURE";

export const UPDATE_USER_BIO = "UPDATE_USER_BIO";
export const UPDATE_USER_BIO_SUCCESS = "UPDATE_USER_BIO_SUCCESS";
export const UPDATE_USER_BIO_FAILURE = "UPDATE_USER_BIO_FAILURE";

export const POST_USER_BIRTH_BIO = "POST_USER_BIRTH_BIO_SUCCESS";
export const POST_USER_BIRTH_BIO_SUCCESS = "POST_USER_BIRTH_BIO_SUCCESS";
export const POST_USER_BIRTH_BIO_FAILURE = "POST_USER_BIRTH_BIO_FAILURE";

export const GETPARENTS = "GETPARENTS";
export const GETPARENTS_SUCCESS = "GETPARENTS_SUCCESS";
export const GETPARENTS_FAILURE = "GETPARENTS_FAILURE";

export const POSTPARENTS = "POSTPARENTS";
export const POSTPARENTS_SUCCESS = "POSTPARENTS_SUCCESS";
export const POSTPARENTS_FAILURE = "POSTPARENTS_FAILURE";

export const DELETEPARENTS = "DELETEPARENTS";
export const PUTPARENTS = "PUTPARENTS";

//Spouses
export const GETSPOUSES = "GETSPOUSES";
export const POSTSPOUSE = "POSTSPOUSE";
export const DELETSPOUSE = "DELETSPOUSE";
export const PUTSPOUSE = "PUTSPOUSE";

// Significant
export const GETSIGNICANT = "GETSIGNICANT";

export const userBio = (userDetails) => {
    const request = doActiongetDevCore({ url: ENDPOINTS.USER_BIO, data: userDetails });
    return {
        type: GET_USERBIO,
        payload: request
    };
}

/**
 * action to save user credentials
 */
export const userBioSuccess = (userDetails) => {
    return {
        type: GET_USERBIO_SUCCESS,
        payload: userDetails
    };
}

export const userBioFailure = (err) => {
    return {
        type: GET_USERBIO_FAILURE,
        payload: err
    };
}

// Post user bio

export const postUserBio = (userDetails) => {
    const request = doActionPostDevCore({ url: ENDPOINTS.USER_BIO, data: userDetails });
    return {
        type: POST_USERBIO,
        payload: request
    };
}

/**
 * action to save user credentials
 */
export const postUserBioSuccess = (userDetails) => {
    return {
        type: POST_USERBIO_SUCCESS,
        payload: userDetails
    };
}

export const postUserBioFailure = (err) => {
    return {
        type: POST_USERBIO_FAILURE,
        payload: err
    };
}

//Get user by bio id

export const getUserBioById = (bioId) => {
    const request = doActiongetDevCore({ url: `${ENDPOINTS.USERBIO_BY_ID}/${bioId}` });
    return {
        type: GET_USER_BYID,
        payload: request
    };
}

/**
 * action to save user credentials
 */
export const getUserBioByIdSuccess = (userDetails) => {
    return {
        type: GET_USER_BYID_SUCCESS,
        payload: userDetails
    };
}

export const getUserBioByIdFailure = (err) => {
    return {
        type: GET_USER_BYID_FAILURE,
        payload: err
    };
}


export const updateUserBio = (userInfo) => {
    const request = doActionPutDevCore({ url: `${ENDPOINTS.EDIT_BIO}`, data: userInfo });
    return {
        type: UPDATE_USER_BIO,
        payload: request
    };
}

/**
 * action to save user credentials
 */
export const updateUserBioSuccess = (userDetails) => {
    return {
        type: UPDATE_USER_BIO_SUCCESS,
        payload: userDetails
    };
}

export const updateUserBioFailure = (err) => {
    return {
        type: UPDATE_USER_BIO_FAILURE,
        payload: err
    };
}

export const postuserbirthinfo = (userDetails) => {
    const request = doActionPostDevCore({ url: ENDPOINTS.USER_BIRTH_BIO, data: userDetails });
    return {
        type: POST_USER_BIRTH_BIO,
        payload: request
    };
}

/**
 * action to save user credentials
 */
export const postuserbirthinfoSuccess = (userDetails) => {
    return {
        type: POST_USER_BIRTH_BIO_SUCCESS,
        payload: userDetails
    };
}

export const postuserbirthinfoFailure = (err) => {
    return {
        type: POST_USER_BIRTH_BIO_FAILURE,
        payload: err
    };
}

/**Get parents details for step 3*/

export const getParents = (bioId) => {
    const request = doActiongetDevCore({ url: `${ENDPOINTS.GETPARENTS}/${bioId}` });
    return {
        type: GETPARENTS,
        payload: request
    };
}

/**
 * action to save user credentials
 */
export const getParentsSuccess = (userDetails) => {
    return {
        type: GETPARENTS_SUCCESS,
        payload: userDetails
    };
}

export const getParentsFailure = (err) => {
    return {
        type: GETPARENTS_FAILURE,
        payload: err
    };
}


// Post parent

export const postParents = (parentObj) => {
    const request = doActionPostDevCore({ url: `${ENDPOINTS.POSTPARENT}`, data: parentObj });
    return {
        type: POSTPARENTS,
        payload: request
    };
}

/**
 * action to save user credentials
 */
export const postParentsSuccess = (userDetails) => {
    return {
        type: POSTPARENTS_SUCCESS,
        payload: userDetails
    };
}

export const postParentsFailure = (err) => {
    return {
        type: POSTPARENTS_FAILURE,
        payload: err
    };
}


/**Delete
 * 
 */

export const deleteParent = (parent_id) => {
    const request = doActionDelDevCore({ url: `${ENDPOINTS.POSTPARENT}/${parent_id}` });
    return {
        type: DELETEPARENTS,
        payload: request
    };
}

export const putParent = (parent_id, data) => {
    const request = doActionPutDevCore({ url: `${ENDPOINTS.POSTPARENT}/${parent_id}`, data: data });
    return {
        type: PUTPARENTS,
        payload: request
    };
}

//Spouses actions

export const getSpouses = (bioId) => {
    const request = doActiongetDevCore({ url: `${ENDPOINTS.GETSPOUSES}/${bioId}` });
    return {
        type: GETSPOUSES,
        payload: request
    };
}

export const postSpouse = (spouseObj) => {
    const request = doActionPostDevCore({ url: `${ENDPOINTS.GETSPOUSES}`, data: spouseObj });
    return {
        type: POSTSPOUSE,
        payload: request
    };
}

export const deleteSpouse = (spouseId) => {
    const request = doActionDelDevCore({ url: `${ENDPOINTS.GETSPOUSES}/${spouseId}` });
    return {
        type: DELETSPOUSE,
        payload: request
    };
}

export const putSpouse = (spouseId, spouseObj) => {
    const request = doActionPutDevCore({ url: `${ENDPOINTS.GETSPOUSES}/${spouseId}`, data: spouseObj });
    return {
        type: PUTSPOUSE,
        payload: request
    };
}

// Significant

export const getSignificants = (bioId) => {
    const request = doActiongetDevCore({ url: `${ENDPOINTS.GETSGNIFICANT}/${bioId}` });
    return {
        type: GETSIGNICANT,
        payload: request
    };
}