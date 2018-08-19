import { combineReducers } from 'redux';

import authReducer from '../components/auth/duck/authReducer';

const rootReducer = combineReducers({
    auth: authReducer,
});

export default rootReducer;
