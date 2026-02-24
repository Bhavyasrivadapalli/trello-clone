// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzUZuzAh2loxaEManiPc6R9r66mz10YcY",
  authDomain: "trello-clone-8ebef.firebaseapp.com",
  projectId: "trello-clone-8ebef",
  storageBucket: "trello-clone-8ebef.firebasestorage.app",
  messagingSenderId: "609367550855",
  appId: "1:609367550855:web:e9ad7b3084cc45e27b4122"
};

// Initialize Firebasee
const app = initializeApp(firebaseConfig);
export default app;