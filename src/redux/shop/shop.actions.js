import * as actionTypes from './shop.actionTypes';

export function setShopData(shopData) {
    return {
        type: actionTypes.SET_SHOP_DATA,
        payload: shopData,
    };
};
