// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACWjbLjQIcny-u1XODm3CCyiK2mj69jrA",
  authDomain: "fixflex-8f82d.firebaseapp.com",
  projectId: "fixflex-8f82d",
  storageBucket: "fixflex-8f82d.appspot.com",
  messagingSenderId: "946783040470",
  appId: "1:946783040470:web:99bd8a1634dd51105cea77",
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
