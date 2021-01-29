import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as actions from './cart.actions';
import * as userActionTypes from './../user/user.actionTypes';

export function* clearCart() {
    yield put(actions.clearCart());
}

export function* onSignOutSuccess() {
    yield takeLatest(userActionTypes.SIGN_OUT_SUCCESS, clearCart);
}

export default function* cartSagas() {
    yield all([
        call(onSignOutSuccess),
    ]);
}
