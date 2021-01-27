import SHOP_DATA from './shop.data';
import * as actionTypes from './shop.actionTypes';

const INITIAL_STATE = {
    collections: [],
};

const shopReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case actionTypes.SET_SHOP_DATA:
            return {
                ...state,
                collections: action.payload,
            };
        default:
            return state;
    }
};

export default shopReducer;
 