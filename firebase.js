
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCHaneLVbYzwOIXtCMezO7bMUGPCSub_1k",
  authDomain: "findyourperfectmatch-47dd5.firebaseapp.com",
  projectId: "findyourperfectmatch-47dd5",
  storageBucket: "findyourperfectmatch-47dd5.appspot.com",
  messagingSenderId: "318312832931",
  appId: "1:318312832931:web:d49bbb9ce52b05dd08c416"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth();
const db=getFirestore()


export {auth,db};