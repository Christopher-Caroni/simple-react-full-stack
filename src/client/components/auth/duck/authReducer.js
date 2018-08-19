import authTypes from './authTypes';

const initialUser = {
    username: '',
};

const initialState = {
    authenticated: false,
    loginInProgress: false,
    signupInProgress: false,
    user: {
        username: '',
    },
};

export default function userReducer(state = initialState, action) {
    const {
        payload: { signupError, loginError, user } = {
            authError: new Error('Unknown error'),
            signupError: new Error('Unknown error'),
            user: initialUser,
        },
    } = action;

    switch (action.type) {
        case authTypes.LOGIN_REQUEST:
            return {
                ...state,
                loginInProgress: true,
            };
        case authTypes.LOGIN_FAILURE:
            return {
                ...initialState,
                loginError,
            };
        case authTypes.LOGIN_SUCCESS:
            return {
                ...state,
                loginInProgress: false,
                authenticated: true,
                user,
                loginError: undefined,
            };

        case authTypes.REFRESH_REQUEST:
            return {
                ...state,
            };
        case authTypes.REFRESH_SUCCESS:
            return {
                ...state,
                authenticated: true,
                loginInProgress: false,
                user,
            };
        case authTypes.REFRESH_FAILURE:
            return {
                ...initialState,
            };

        case authTypes.REGISTER_REQUEST:
            return {
                ...state,
                signupInProgress: true,
            };
        case authTypes.REGISTER_FAILURE:
            return {
                ...initialState,
                signupError,
            };
        case authTypes.REGISTER_SUCCESS:
            return {
                ...state,
                signupInProgress: false,
                user,
                signupError: undefined,
            };

        case authTypes.LOGOUT_REQUEST:
            return {
                ...state,
            };
        case authTypes.LOGOUT_FAILURE:
            return {
                ...state,
            };
        case authTypes.LOGOUT_SUCCESS:
            return {
                ...initialState,
            };
        default:
            return state;
    }
}
