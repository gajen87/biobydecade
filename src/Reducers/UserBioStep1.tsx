import {
    POST_USERBIO,
    POST_USERBIO_SUCCESS,
    POST_USERBIO_FAILURE
} from "../Actions/biographicalTableStepOne";


const INITIAL_STATE = {
    userBioStep1: {}
}

const dict = {
    [POST_USERBIO]: (state = INITIAL_STATE) => ({
        ...state,
        userBioStep1: {
            userBioStep1: undefined,
            error: null,
            loading: true
        }
    }),
    [POST_USERBIO_SUCCESS]: (state = INITIAL_STATE, action:any = {}) => ({
        ...state,
        userBioStep1: {
            userBioStep1: action.payload,
            error: null,
            loading: false
        }
    }),
    [POST_USERBIO_FAILURE]: (state = INITIAL_STATE, action:any = {}) => ({
        ...state,
        userBioStep1: {
            userBioStep1: undefined,
            error: action.payload.message,
            loading: false
        }
    }),
};

export default function (state = INITIAL_STATE, action:any = {}) {
    const delegate = dict[action.type];
    if (!!delegate) {
        return delegate(state, action);
    }
    return state;
}