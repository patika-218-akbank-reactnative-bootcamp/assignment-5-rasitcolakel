// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBiuf4spC_3FoWjxJkDy0b80DaWe3TUOiY',
  authDomain: 'patika-assignment-5.firebaseapp.com',
  projectId: 'patika-assignment-5',
  storageBucket: 'patika-assignment-5.appspot.com',
  messagingSenderId: '825366310978',
  appId: '1:825366310978:web:ffe94871e9869185103ddb',
  measurementId: 'G-0HFGN6CH0F',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth to use signup and login
export const auth = getAuth(app);

// Initialize Firebase firestore to use database
export const db = getFirestore(app);
