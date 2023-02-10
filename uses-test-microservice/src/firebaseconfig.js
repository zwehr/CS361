// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPJ6IOFtGMChtZLOQU__MjwZ6byaFckzk",
  authDomain: "avatar-microservice.firebaseapp.com",
  projectId: "avatar-microservice",
  storageBucket: "avatar-microservice.appspot.com",
  messagingSenderId: "1097899890586",
  appId: "1:1097899890586:web:9aa6b72ba0ef6630518c23"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)