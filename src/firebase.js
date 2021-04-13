import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNOx8OMdOk-vq5q6WVH5zOiYv6rbQdYMg",
  authDomain: "team-16921.firebaseapp.com",
  projectId: "team-16921",
  storageBucket: "team-16921.appspot.com",
  messagingSenderId: "542392490569",
  appId: "1:542392490569:web:546e3269f5f8314e893d98",
  measurementId: "G-BXNQBYZ71S",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
// Aunthentication
const auth = firebase.auth();
// google auth provider
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
