import { combineReducers } from 'redux';
// import { routerReducer } from 'react-router-redux';
import loginReducer from './LoginReducer';
import UserBioStep1 from './UserBioStep1';

const rootReducer = combineReducers({
    loginReducer: loginReducer,
    UserBioStep1: UserBioStep1,
});

export default rootReducer;