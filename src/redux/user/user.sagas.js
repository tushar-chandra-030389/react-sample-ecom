import {  takeEvery, takeLatest, put, all, call } from 'redux-saga/effects';
import * as actions from './user.actions';
import * as actionTypes from './user.actionTypes';
import {
    auth,
    googleProvider,
    createUserProfileDocument,
    getCurrentUser,
} from './../../firebase/firebase.utils';

function* signInWithGoogle() {
    try {
        const { user } = yield auth.signInWithPopup(googleProvider);
        const userRef = yield call(createUserProfileDocument, user);
        const userSnapshot = yield userRef.get();

         yield put(actions.googleSignInSuccess({
             id: userSnapshot.id,
             ...userSnapshot.data(),
         }));
    } catch(e) {
        yield put(actions.googleSignInFailure(e));
    }   
}

function* signInWithEmail({ payload }) {
    const { email, password } = payload;

    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        const userRef = yield call(createUserProfileDocument, user);
        const userSnapshot = yield userRef.get();
        
        yield put(actions.emailSignInSuccess({
            id: userSnapshot.id,
            ...userSnapshot.data(),
        }));
    } catch(e) {
        yield put(actions.emailSignInFailure(e));
    }
}

function* checkUserSession() {
    try {
        const user = yield getCurrentUser();
        if (!user) {
            return;
        }
        
        const userRef = yield call(createUserProfileDocument, user);
        const userSnapshot = yield userRef.get();

        yield put(actions.emailSignInSuccess({
            id: userSnapshot.id,
            ...userSnapshot.data(),
        }));
    } catch(e) {
        yield put(actions.emailSignInFailure(e));
    }
}

function* signOut() {
    try {
        yield auth.signOut();
        yield put(actions.signOutSuccess());
    } catch(e) {
        yield put(actions.signOutFailure(e));
    }
}

function* signUp({payload}) {
    const {
        displayName,
        email,
        password,
    } = payload;

    try {
        const { user } = yield auth.createUserWithEmailAndPassword(email, password);
        const userRef = yield createUserProfileDocument(user, { displayName });
        const userSnapshot = yield userRef.get();

        yield put(actions.emailSignInSuccess({
            id: userSnapshot.id,
            ...userSnapshot.data(),
        }));
    } catch(e) {
        yield put(actions.signUpFailure(e));
    }
}

export function* onGoogleSignInStart() {
    yield takeLatest(actionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
    yield takeLatest(actionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onCheckUserSession() {
    yield takeLatest(actionTypes.CHECK_USER_SESSION, checkUserSession);
}

export function* onSignOut() {
    yield takeLatest(actionTypes.SIGN_OUT_START, signOut);
}

export function* onSignUp() {
    yield takeLatest(actionTypes.SIGN_UP_START, signUp);
}

export default function* userSagas() {
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onCheckUserSession),
        call(onSignOut),
        call(onSignUp),
    ]);
}
