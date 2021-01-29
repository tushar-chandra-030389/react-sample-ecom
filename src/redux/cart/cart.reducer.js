import * as actionTypes from './cart.actionTypes';
import * as utils from './cart.util';

const INITIAL_STATE = {
    hidden: true,
    cartItems: [],
};

const cartReducer = (state= INITIAL_STATE, action) => {
    switch(action.type) {
        case actionTypes.TOGGLE_CART_HIDDEN:
            return {
                ...state,
                hidden: !state.hidden,
            };
            break;

        case actionTypes.ADD_ITEM_TO_CART:
            return {
                ...state,
                cartItems: utils.addItemToCart(state.cartItems, action.payload),
            };
            break;

        case actionTypes.CLEAR_ITEM_FROM_CART:
            return {
                ...state,
                cartItems: utils.clearCartItem(state.cartItems, action.payload),
            };

        case actionTypes.REMOVE_ITEM_FROM_CART:
            return {
                ...state,
                cartItems: utils.removeCartItem(state.cartItems, action.payload),
            };

        case actionTypes.CLEAR_CART:
            return {
                ...state,
                cartItems:  [],
            };

        default:
            return state;
    }
};

export default cartReducer;
