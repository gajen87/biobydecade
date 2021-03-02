import {
    USER_DETAILS, USER_DETAILS_SUCCESS, USER_DETAILS_FAILURE
} from "../Actions/loginAction";


const INITIAL_STATE = {
    userDetails: {}
}

const dict = {
    [USER_DETAILS]: (state = INITIAL_STATE) => ({
        ...state,
        userDetails: {
            userDetails: undefined,
            error: null,
            loading: true
        }
    }),
    [USER_DETAILS_SUCCESS]: (state = INITIAL_STATE, action:any = {}) => ({
        ...state,
        userDetails: {
            userDetails: action.payload,
            error: null,
            loading: false
        }
    }),
    [USER_DETAILS_FAILURE]: (state = INITIAL_STATE, action:any = {}) => ({
        ...state,
        userDetails: {
            userDetails: undefined,
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