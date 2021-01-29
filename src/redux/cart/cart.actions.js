import * as actionTypes from './cart.actionTypes';

export function toggleCartHidden() {
    return {
        type: actionTypes.TOGGLE_CART_HIDDEN,
    };
};

export const addItem = (item) => {
    return {
        type: actionTypes.ADD_ITEM_TO_CART,
        payload: item,
    };
};

export const clearItem = (item) => {
    return {
        type: actionTypes.CLEAR_ITEM_FROM_CART,
        payload: item,
    };
};

export const removeItem = (item) => {
    return {
        type: actionTypes.REMOVE_ITEM_FROM_CART,
        payload: item,
    };
};

export const clearCart = () => {
    return {
        type: actionTypes.CLEAR_CART,
    };
};
