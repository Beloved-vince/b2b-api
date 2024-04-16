// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDillDODE8ryEW0xLQMPz_4_LSnvx3I7q0",
  authDomain: "basic-ecommerce-647b5.firebaseapp.com",
  projectId: "basic-ecommerce-647b5",
  storageBucket: "basic-ecommerce-647b5.appspot.com",
  messagingSenderId: "528712988913",
  appId: "1:528712988913:web:4278fd39d1d4632063d150",
  measurementId: "G-E8WSZF7X96"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);