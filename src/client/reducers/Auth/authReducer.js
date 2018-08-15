import authConstants from '../../constants/Auth/authConstants';

const initialUser = {
    username: '',
};

const initialState = {
    authenticated: false,
    loggingIn: false,
    user: {
        username: '',
    },
};

export default function userReducer(state = initialState, action) {
    const {
        payload: { error: loginError, user } = {
            error: new Error('Encountered unknown error while logging in'),
            user: initialUser,
        },
    } = action;

    switch (action.type) {
        case authConstants.LOGIN_REQUEST:
            return {
                ...state,
                loggingIn: true,
            };
        case authConstants.LOGIN_FAILURE:
            return {
                ...initialState,
                loginError,
            };
        case authConstants.LOGIN_SUCCESS:
            return {
                ...state,
                loggingIn: false,
                authenticated: true,
                user,
            };
        case authConstants.REGISTER_REQUEST:
            return {
                ...state,
                loggingIn: true,
            };
        case authConstants.REGISTER_FAILURE:
            return {
                ...initialState,
            };
        case authConstants.REGISTER_SUCCESS:
            return {
                ...state,
                loggingIn: false,
                loginError,
                user,
            };
        default:
            return state;
    }
}
