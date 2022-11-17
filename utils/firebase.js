import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider,signInWithEmailAndPassword,signOut,signInWithPopup,createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore,setDoc,collection,getDocs,doc,getDoc } from "firebase/firestore";

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
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
//Providers
export const googleProvider = new GoogleAuthProvider();

//Sign In User (email and password)
export const signInUserWithEmailAndPassword = (username,password) =>{
  signInWithEmailAndPassword(auth, username, password)
  .then((userCredential) => {
  })
  .catch((error) => {
    console.log(error);
  });
}

//Sign In User (google)
export const signInUserWithGooglePopup = ()=>signInWithPopup(auth, googleProvider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    //NEED TO CHECK IF SIGN UP
    getUserData(user).then(data=>{
      if(!data) setUserToDb(user);
    });
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

// Sign Up User (email and password)
export const signUpUserWithEmailAndPassword = (email,password) => createUserWithEmailAndPassword(auth, email, password).then((userDetails)=>setUserToDb(userDetails.user)).catch((error) => console.log(error)
);

//Sign Out User
export const signOutUser = ()=> signOut(auth).catch((error)=>console.log(error))

export const setUserToDb = async (userDetails) => {
  try {
    await setDoc(doc(db, "users",userDetails.uid), {
      displayName:userDetails.displayName ? 
      userDetails.displayName : 
      userDetails.email.substring(0, userDetails.email.lastIndexOf("@")),
      email:userDetails.email,
      createdAt:userDetails.metadata.creationTime,
      lastSignIn:userDetails.metadata.lastSignInTime,
      products:[]
    });
    // console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
export const getAllUsers = async () => {
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
  console.log(doc.id,doc.data());
});
}
export const getUserData = async (user) => {
  const docRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
  // console.log("Document data:", docSnap.data());
  return docSnap.data()
  } else {
  // doc.data() will be undefined in this case
  console.log("No such document!");
}
}

export const updateUserCartInFirestore = async(userDetails,products)=>{
  try {
    const userData = await getUserData(userDetails);
    await setDoc(doc(db, "users",userDetails.uid), {
      ...userData,
      products
    });
    // console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export const updateUserLoginInFirestore = async(userDetails)=>{
  try {
    const userData = await getUserData(userDetails);
    await setDoc(doc(db, "users",userDetails.uid), {
      ...userData,
      lastSignIn:userDetails.metadata.lastSignInTime
    });
    // console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}