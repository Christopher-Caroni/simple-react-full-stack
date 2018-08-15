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
        payload: { error: authError, user } = {
            error: new Error('Encountered unknown error while logging in'),
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
            };
        case authConstants.REGISTER_SUCCESS:
            return {
                ...state,
                authInProgress: false,
                authError,
                user,
            };
        default:
            return state;
    }
}
