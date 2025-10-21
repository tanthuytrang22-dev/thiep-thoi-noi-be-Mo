// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAuFX3hJBWldXCx1CDsgz6TF5U1L1mQKiQ",
  authDomain: "tnmo-e85c3.firebaseapp.com",
  projectId: "tnmo-e85c3",
  storageBucket: "tnmo-e85c3.firebasestorage.app",
  messagingSenderId: "563405866907",
  appId: "1:563405866907:web:7e299cc0bc335648ee033e",
  measurementId: "G-ZNRTVTJKKV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
