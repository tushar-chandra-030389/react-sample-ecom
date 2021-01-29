import * as actionTypes from './user.actionTypes';

export const checkUserSession = () => {
    return {
        type: actionTypes.CHECK_USER_SESSION,
    };
};

export const googleSignInStart = () => {
    return {
        type: actionTypes.GOOGLE_SIGN_IN_START
    };
};

export const googleSignInSuccess = (user) => {
    return {
        type: actionTypes.GOOGLE_SIGN_IN_SUCCESS,
        payload: user,
    };
};

export const googleSignInFailure = (error) => {
    return {
        type: actionTypes.GOOGLE_SIGN_IN_FAILURE,
        payload: error
    };
};

export const emailSignInStart = (email, password) => {
    return {
        type: actionTypes.EMAIL_SIGN_IN_START,
        payload: { email, password }
    };
};

export const emailSignInSuccess = (user) => {
    return {
        type: actionTypes.EMAIL_SIGN_IN_SUCCESS,
        payload: user,
    };
};

export const emailSignInFailure = (error) => {
    return {
        type: actionTypes.EMAIL_SIGN_IN_FAILURE,
        payload: error
    };
};

export const signOutStart = () => {
    return {
        type: actionTypes.SIGN_OUT_START,
    };
};

export const signOutSuccess = () => {
    return {
        type: actionTypes.SIGN_OUT_SUCCESS,
    };
};

export const signOutFailure = (error) => {
    return {
        type: actionTypes.SIGN_OUT_FAILURE,
        payload: error,
    };
};

export const signUpStart = (input) => {
    return {
        type: actionTypes.SIGN_UP_START,
        payload: input,
    };
};

export const signUpSuccess = () => {
    return {
        type: actionTypes.SIGN_UP_SUCCESS,
    };
};

export const signUpFailure = () => {
    return {
        type: actionTypes.SIGN_UP_FAILURE,
    };
};
