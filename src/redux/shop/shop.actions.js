import * as actionTypes from './shop.actionTypes';
import { firestore, convertCollectionsSnapshotToMap } from './../../firebase/firebase.utils';

export function fetchingShopDataStart() {
    return ({
        type: actionTypes.FETCHING_SHOP_DATA_START,
    });
}

export function fetchingShopDataSuccess(data) {
    return {
        type: actionTypes.FETCHING_SHOP_DATA_SUCCESS,
        payload: data,
    };
}

export function fetchingShopDataError(error) {
    return {
        type: actionTypes.FETCHING_SHOP_DATA_ERROR,
        paylaod: error,
    };
}
