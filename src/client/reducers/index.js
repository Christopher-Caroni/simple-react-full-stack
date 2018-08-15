import { combineReducers } from 'redux';

import authReducer from './Auth/authReducer';

const rootReducer = combineReducers({
    auth: authReducer,
});

export default rootReducer;
