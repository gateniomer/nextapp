import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider,signInWithEmailAndPassword,signOut,signInWithPopup } from "firebase/auth";

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
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
//Providers
export const googleProvider = new GoogleAuthProvider();

export const signInUserWithEmailAndPassword = (username,password) =>{
  signInWithEmailAndPassword(auth, username, password)
  .then((userCredential) => {
    console.log('Signed In Succesfully!');
  })
  .catch((error) => {
    console.log(error);
  });
}

export const signOutUser = ()=>{
  signOut(auth).then(()=>{
    console.log('Signed Out Succesfully');
  }).catch((error)=>{
    console.log(error);
  })
}

export const signInUserWithGooglePopup = ()=>signInWithPopup(auth, googleProvider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });