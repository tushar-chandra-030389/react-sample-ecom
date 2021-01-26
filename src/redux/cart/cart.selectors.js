import { createSelector } from 'reselect';

const selectCart = (state) => state.cart;

export const selectCartItems = createSelector(
    [selectCart],
    (cart) => cart.cartItems,
);

export const selectCartHidden = createSelector(
    [selectCart],
    (cart) => cart.hidden, 
);

export const selctCartItemsCount = createSelector(
    [selectCartItems],
    (cartItems) => {
        return cartItems.reduce(
            (total, cartItem) => {
                return total + cartItem.quantity;
            },
            0    
        );
    },
);

export const selectCartTotal = createSelector(
    [selectCartItems],
    (cartItems) => {
        return cartItems.reduce((total, cartItem) => {
            return total + (cartItem.price * cartItem.quantity)
        }, 0);
    },
);