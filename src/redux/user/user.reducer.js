import * as actionTypes from './user.actionTypes';

const INITIAL_STATE = {
    currentUser: null,
    error: null,
};


const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case actionTypes.GOOGLE_SIGN_IN_SUCCESS:
        case actionTypes.EMAIL_SIGN_IN_SUCCESS:
            console.log(action)
            return {
                ...state,
                currentUser: action.payload,
                error: null,
            };

        case actionTypes.GOOGLE_SIGN_IN_FAILURE:
        case actionTypes.EMAIL_SIGN_IN_FAILURE:
            return {
                ...state,
                error: action.paylaod,
            };

        case actionTypes.SIGN_OUT_SUCCESS:
            return {
                ...state,
                currentUser: null,
                error: null,
            };

        default:
            return state;
    }
};

export default userReducer;