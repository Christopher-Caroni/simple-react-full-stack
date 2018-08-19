import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import ReduxThunk from 'redux-thunk';

import rootReducer from '../reducers';

const loggerMiddleware = createLogger();
const store = createStore(
    rootReducer,
    applyMiddleware(
        ReduxThunk, // lets us dispatch() functions
        loggerMiddleware // neat middleware that logs actions
    )
);

export default store;
