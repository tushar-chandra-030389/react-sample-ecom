import { all, call } from 'redux-saga/effects';
import shopSagas from './shop/shop.sagas';
import userSagas from './user/user.sagas';
import cartSagas from './cart/cart.sagas';

export default function* rootSaga() {
    // yield saga1();
    // yield saga2();

    // or

    // yield all([
    //     call(saga1),
    //     call(saga2),
    // ]);

    yield all([
        call(shopSagas),
        call(userSagas),
        call(cartSagas),
    ]);
}