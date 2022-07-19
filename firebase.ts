import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpUNl1Aqle5y-J3niDNcMGn467axbYhqY",
  authDomain: "messenger-d158d.firebaseapp.com",
  projectId: "messenger-d158d",
  storageBucket: "messenger-d158d.appspot.com",
  messagingSenderId: "1002760796420",
  appId: "1:1002760796420:web:d06a8c771f65b34272b851",
  measurementId: "G-4TDB3TWBEC",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();
const authentication = getAuth(app);

export { db, authentication, GoogleAuthProvider };
