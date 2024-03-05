// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage"; // Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8WZSIo5vLmC-FLLjpKcRDko7RH49rUgM",
  authDomain: "fixflex-68121.firebaseapp.com",
  projectId: "fixflex-68121",
  storageBucket: "fixflex-68121.appspot.com",
  messagingSenderId: "321991882966",
  appId: "1:321991882966:web:abb62676e8fbe41956f177",
};

// Initialize Firebase
//const app = initializeApp(firebaseConfig);
//const auth = getAuth();
firebase.initializeApp(firebaseConfig);

// firestore
let db = firebase.firestore();
// za autent firebase.auth() , zabazu firebase.data idk ...
//storage za firebaase
let storage = firebase.storage();

//moramoexportat firebase na sva mjesta u apk di treba

export { firebase, db, storage };
//ili samo firebase, -> skraceno je kad je isti kljuc i vrijednost
