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

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);

    const batch = firestore.batch();

    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    });

    return await batch.commit();
};

export const getIfHasShopCollections = async () => {
    const collectionRef = firestore.collection('collections');
    const snapshot = await collectionRef.get();

    return !snapshot.empty;
};

export const convertCollectionsSnapshotToMap = (collectionsSnapShot) => {
    const transformedData = collectionsSnapShot.docs.map(doc => {
        const { title, items } = doc.data();

        return {
            routeName: encodeURI(title.toLowerCase()),
            title,
            items,
            id: doc.id,
        };
    });

    return transformedData.reduce((result, collection) => {
        result[collection.title.toLowerCase()] = collection;

        return result;
    }, {});
};

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe();
            resolve(userAuth);
        }, () => {
            reject();
        });
    });
};

const app = firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore(app);

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({
    promt: 'select_account',
});

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;