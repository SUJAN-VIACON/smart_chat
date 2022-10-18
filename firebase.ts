import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import {getStorage} from "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVIJbg_qq4gDz76KRkq_Aqk0FUiBI2JyY",
  authDomain: "chat-app-22375.firebaseapp.com",
  projectId: "chat-app-22375",
  storageBucket: "chat-app-22375.appspot.com",
  messagingSenderId: "133433212722",
  appId: "1:133433212722:web:b917f61d9a9e1dae4aa12b",
  measurementId: "G-QFP1CTFC59"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();
const authentication = getAuth(app);
const storage = getStorage(app);

export { db, authentication, GoogleAuthProvider,storage };
