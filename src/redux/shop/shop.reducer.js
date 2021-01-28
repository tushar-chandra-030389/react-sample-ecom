import SHOP_DATA from './shop.data';
import * as actionTypes from './shop.actionTypes';

const INITIAL_STATE = {
    collections: [],
    isFetching: false,
    error: null,
};

const shopReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case actionTypes.FETCHING_SHOP_DATA_START:
            return {
                ...state,
                isFetching: true,
            };

        case actionTypes.FETCHING_SHOP_DATA_SUCCESS:
            return {
                ...state,
                collections: action.payload,
                isFetching: false,
            };

        case actionTypes.FETCHING_SHOP_DATA_ERROR:
            return {
                ...state,
                isFetching: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

export default shopReducer;
 