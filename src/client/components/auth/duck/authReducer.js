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
                authInProgress: true,
            };
        case authTypes.LOGIN_FAILURE:
            return {
                ...initialState,
                loginError,
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
