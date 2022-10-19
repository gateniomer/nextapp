// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJNW2V_pcOKD1cRJm1kr_ZRA0Tk4wHkqI",
  authDomain: "next-store-d970e.firebaseapp.com",
  projectId: "next-store-d970e",
  storageBucket: "next-store-d970e.appspot.com",
  messagingSenderId: "920933525243",
  appId: "1:920933525243:web:1bb4cacec8792c0e3df25e",
  measurementId: "G-ZVNFDT8Y0V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);