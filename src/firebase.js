// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvVTxJZ_lLTGhmhsK1bbqPp8XTIKWckL8",
  authDomain: "adv-app-dev-assignment.firebaseapp.com",
  projectId: "adv-app-dev-assignment",
  storageBucket: "adv-app-dev-assignment.appspot.com",
  messagingSenderId: "923720245338",
  appId: "1:923720245338:web:1dd5e75ae306ede64c3863"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
