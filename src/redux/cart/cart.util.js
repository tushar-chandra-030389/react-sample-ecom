export const addItemToCart = (cartItems, newCartItem) => {
    const isExisting = cartItems.find(({ id }) => id === newCartItem.id);

    if (isExisting) {
        return cartItems.map((cartItem) => {
            if (cartItem.id === newCartItem.id) {
                return { ...cartItem, quantity: cartItem.quantity + 1 };
            }

            return cartItem;
        });
    }

    return [...cartItems, { ...newCartItem, quantity: 1 }];
};

export const clearCartItem = (cartItems, itemToClear) => {
    return cartItems.filter(cartItem => cartItem.id !== itemToClear.id);
};

export const removeCartItem = (cartItems, itemToRemove) => {
    const exitingCartItem = cartItems.find(cartItem => cartItem.id === itemToRemove.id);
    
    if (exitingCartItem.quantity === 1) {
        return clearCartItem(cartItems, itemToRemove);
    }

    return cartItems.map(cartItem => {
        if (cartItem.id === itemToRemove.id) {
            return {
                ...cartItem,
                quantity: cartItem.quantity - 1,
            };
        }

        return cartItem;
    });
};