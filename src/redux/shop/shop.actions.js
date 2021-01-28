import * as actionTypes from './shop.actionTypes';
import { firestore, convertCollectionsSnapshotToMap } from './../../firebase/firebase.utils';

export function fetchingShopDataStart() {
    return (dispatch) => {
        dispatch({
            type: actionTypes.FETCHING_SHOP_DATA_START,
        });

        const collectionRef = firestore.collection('collections');

        // Observable and Observers pattern
        // this.unsubsribeFromSnapshot = collectionRef.onSnapshot(snapshot => {
        //     const collectionMap = convertCollectionsSnapshotToMap(snapshot);
        // });

        // promise pattern
        collectionRef.get().then((snapshot) => {
            const collectionMap = convertCollectionsSnapshotToMap(snapshot);
            dispatch(fetchingShopDataSuccess(collectionMap));
        }).catch((error) => {
            dispatch(fetchingShopDataError(error.message));
        });
    };
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
