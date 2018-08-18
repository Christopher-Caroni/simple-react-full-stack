import authConstants from '../../constants/Auth/authConstants';

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
        case authConstants.LOGIN_REQUEST:
            return {
                ...state,
                authInProgress: true,
            };
        case authConstants.LOGIN_FAILURE:
            return {
                ...initialState,
                authError,
            };
        case authConstants.LOGIN_SUCCESS:
            return {
                ...state,
                authInProgress: false,
                authenticated: true,
                user,
            };
        case authConstants.REGISTER_REQUEST:
            return {
                ...state,
                authInProgress: true,
            };
        case authConstants.REGISTER_FAILURE:
            return {
                ...initialState,
                signupError,
            };
        case authConstants.REGISTER_SUCCESS:
            return {
                ...state,
                authInProgress: false,
                user,
            };
        default:
            return state;
    }
}
