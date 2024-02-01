// sva inicijalizacija potrebna za firebase bit ce tu
import { initializeApp } from 'firebase/app';
import { } from "firebase/auth";
import { } from "firebase/firestore";

// kljucevi i vrijednosti specificni za moj projekt
const firebaseConfig = {
    apiKey: "AIzaSyACWjbLjQIcny-u1XODm3CCyiK2mj69jrA",
    authDomain: "fixflex-8f82d.firebaseapp.com",
    projectId: "fixflex-8f82d",
    storageBucket: "fixflex-8f82d.appspot.com",
    messagingSenderId: "946783040470",
    appId: "1:946783040470:web:99bd8a1634dd51105cea77"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);

export default {
    firebase: firebase,

};