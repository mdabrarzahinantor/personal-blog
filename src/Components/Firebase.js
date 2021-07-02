import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBEGwPWkqSWjpd6wUH93KQqLlKSCc4bRps",
  authDomain: "react-blog-9bbf5.firebaseapp.com",
  projectId: "react-blog-9bbf5",
  storageBucket: "react-blog-9bbf5.appspot.com",
  messagingSenderId: "617541980524",
  appId: "1:617541980524:web:2f394be026dfacbb10e349",
  measurementId: "G-96Q0MK5YHZ",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
export const storage = firebaseApp.storage();

const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
