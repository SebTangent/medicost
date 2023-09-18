// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCiGt7X2PoXZgtDOZ7qYtyBytLgi75g24k",
  authDomain: "medicost-2a291.firebaseapp.com",
  projectId: "medicost-2a291",
  storageBucket: "medicost-2a291.appspot.com",
  messagingSenderId: "879248952964",
  appId: "1:879248952964:web:78bb2277881d92e4f9bcd1",
  measurementId: "G-6C8KYD4WHG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);