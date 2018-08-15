import axios from 'axios';
import authConstants from '../../constants/Auth/authConstants';

const USER_API_URL = '/api/auth';

function loginRequest(user) {
    return {
        type: authConstants.LOGIN_REQUEST,
        payload: { user },
    };
}

function loginSuccess(user) {
    return {
        type: authConstants.LOGIN_SUCCESS,
        payload: { user },
    };
}

function loginFailure(error) {
    return {
        type: authConstants.LOGIN_FAILURE,
        payload: { error },
    };
}

export function login(user) {
    return dispatch => {
        dispatch(loginRequest(user));

        return axios.post(`${USER_API_URL}/login`, user).then(
            res => {
                dispatch(loginSuccess(res.data));
            },
            err => {
                dispatch(loginFailure(err));
            }
        );
    };
}

export function refreshCurrentUser() {
    return dispatch =>
        axios.get(`${USER_API_URL}`).then(
            res => {
                dispatch(loginSuccess(res.data));
            },
            err => {
                dispatch(loginFailure(err));
            }
        );
}

export function signup() {
    console.log('TODO');
    return loginFailure();
}
