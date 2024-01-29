import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider}  from 'firebase/auth'
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDMvs02DV2in6LKrWdAbJMXdeF1DyXbtII",
  authDomain: "news-a04e0.firebaseapp.com",
  projectId: "news-a04e0",
  storageBucket: "news-a04e0.appspot.com",
  messagingSenderId: "491725186710",
  appId: "1:491725186710:web:4c33ece992faddaccd84b7"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider(app)
export const database = getFirestore(app)