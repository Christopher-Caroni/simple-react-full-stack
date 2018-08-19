import authTypes from './authTypes';

const initialUser = {
    username: '',
};

const initialState = {
    authenticated: false,
    authInProgress: false,
    user: {
        username: '',
    },
    authError: undefined,
};

export default function userReducer(state = initialState, action) {
    const {
        payload: { authError, signupError, user } = {
            authError: new Error('Unknown error'),
            signupError: new Error('Unknown error'),
            user: initialUser,
        },
    } = action;

    switch (action.type) {
        case authTypes.LOGIN_REQUEST:
            return {
                ...state,
                authInProgress: true,
            };
        case authTypes.LOGIN_FAILURE:
            return {
                ...initialState,
                authError,
            };
        case authTypes.LOGIN_SUCCESS:
            return {
                ...state,
                authInProgress: false,
                authenticated: true,
                user,
            };
        case authTypes.REGISTER_REQUEST:
            return {
                ...state,
                authInProgress: true,
            };
        case authTypes.REGISTER_FAILURE:
            return {
                ...initialState,
                signupError,
            };
        case authTypes.REGISTER_SUCCESS:
            return {
                ...state,
                authInProgress: false,
                user,
            };
        default:
            return state;
    }
}
