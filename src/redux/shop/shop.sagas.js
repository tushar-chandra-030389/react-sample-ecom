import { takeEvery, put, call, takeLatest, all } from 'redux-saga/effects';
import * as actionTypes from './shop.actionTypes';
import * as actions from './shop.actions';
import { firestore, convertCollectionsSnapshotToMap } from './../../firebase/firebase.utils';


export function* fetchCollections() {
    yield console.log('fired');

    const collectionRef = firestore.collection('collections');

    // promise pattern
    try {
        const snapshot = yield collectionRef.get();
        const collectionMap = yield call(convertCollectionsSnapshotToMap, snapshot);
        yield put(actions.fetchingShopDataSuccess(collectionMap));
    } catch(error) {
        yield put(actions.fetchingShopDataError(error.message));
    }
}

export function* fetchCollectionsStart() {
    yield takeLatest(
        actionTypes.FETCHING_SHOP_DATA_START,
        fetchCollections
    );
}

export default function* shopSagas() {
    yield all([
        call(fetchCollectionsStart),
    ]);
}
