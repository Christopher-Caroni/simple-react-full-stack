import axios from 'axios';
import authConstants from '../../constants/Auth/authConstants';
import { transformHttpError } from './authHelpers';

const USER_API_URL = '/api/auth';

function loginRequest() {
    return {
        type: authConstants.LOGIN_REQUEST,
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
        dispatch(loginRequest());

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

function signupRequest() {
    return {
        type: authConstants.REGISTER_REQUEST,
    };
}

function signupSuccess(user) {
    return {
        type: authConstants.REGISTER_SUCCESS,
        payload: { user },
    };
}

function signupFailure(error) {
    return {
        type: authConstants.REGISTER_FAILURE,
        payload: { error },
    };
}

export function signup(userCredentials) {
    return dispatch => {
        dispatch(signupRequest());

        return axios.post(`${USER_API_URL}/register`, userCredentials).then(
            res => {
                dispatch(signupSuccess(res.data));
            },
            err => {
                dispatch(signupFailure(transformHttpError(err)));
            }
        );
    };
}
