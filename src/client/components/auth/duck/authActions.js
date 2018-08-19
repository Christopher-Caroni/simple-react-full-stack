import axios from 'axios';
import authTypes from './authTypes';
import { transformHttpError } from './authHelpers';

const USER_API_URL = '/api/auth';

function loginRequest() {
    return {
        type: authTypes.LOGIN_REQUEST,
    };
}

function loginSuccess(user) {
    return {
        type: authTypes.LOGIN_SUCCESS,
        payload: { user },
    };
}

function loginFailure(error) {
    return {
        type: authTypes.LOGIN_FAILURE,
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
        type: authTypes.REGISTER_REQUEST,
    };
}

function signupSuccess(user) {
    return {
        type: authTypes.REGISTER_SUCCESS,
        payload: { user },
    };
}

function signupFailure(signupError) {
    return {
        type: authTypes.REGISTER_FAILURE,
        payload: { signupError },
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