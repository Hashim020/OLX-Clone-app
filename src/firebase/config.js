import { initializeApp } from 'firebase/app';
import {getFirestore} from 'firebase/firestore'
import 'firebase/storage'


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBSLqsG5iOx7GHv0Rz2DmIfTHwlkyDh7pU",
  authDomain: "olx-clone-abda9.firebaseapp.com",
  projectId: "olx-clone-abda9",
  storageBucket: "olx-clone-abda9.appspot.com",
  messagingSenderId: "284264361928",
  appId: "1:284264361928:web:45cd23674012e087cb1afd",
  measurementId: "G-5ZGK78NZ65"
};


const firebaseapp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseapp)

export default db

