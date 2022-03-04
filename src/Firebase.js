import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDzqgQIXrbs_MPOhGHdJZoQuVy4vfFX390",
  authDomain: "nftwhitelist-66f21.firebaseapp.com",
  projectId: "nftwhitelist-66f21",
  storageBucket: "nftwhitelist-66f21.appspot.com",
  messagingSenderId: "613444533532",
  appId: "1:613444533532:web:d3623e6d28a358f3f08ed9"
};

firebase.initializeApp(firebaseConfig);
export default firebase;
