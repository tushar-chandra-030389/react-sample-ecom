import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCmW1OaITVDyOCveyQF_qqJF9p9PBLlY6E",
    authDomain: "ecom-a8623.firebaseapp.com",
    projectId: "ecom-a8623",
    storageBucket: "ecom-a8623.appspot.com",
    messagingSenderId: "311403430210",
    appId: "1:311403430210:web:ce0062c77497134a6148db"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) {
        return;
    }

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapshot = await userRef.get();

    if (!snapshot.exists) {
        const {
            displayName,
            email
        } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch(e) {
            console.log('Error creating user ', e.message)
        }
    }

    return userRef;
};

const app = firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore(app);

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
    promt: 'select_account',
});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;