import firebase from "firebase";

try {
    firebase.initializeApp({
        apiKey: "AIzaSyD2R5Wrb2_LWjfX1AW4i0D18wOnCOk7Aw8",
        authDomain: "pg-teknix.firebaseapp.com",
        projectId: "pg-teknix",
        storageBucket: "pg-teknix.appspot.com",
        messagingSenderId: "742696999399",
        appId: "1:742696999399:web:c2cef80f123b20b5f40542",
        measurementId: "G-Z6L7360HN4"
    });
} catch (err) {
    // we skip the "already exists" message which is
    // not an actual error when we're hot-reloading
    if (!/already exists/.test(err.message)) {
        console.error('Firebase initialization error', err.stack)
    }
}

const db  = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();
const database = firebase.database()
export {db, auth, storage, provider, database};
