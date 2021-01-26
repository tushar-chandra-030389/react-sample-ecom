import * as actionTypes from './user.actionTypes';

export const setCurrentUser = (user) => {
    return {
        type: actionTypes.SET_CURRENT_USER,
        payload: user,
    };
};
