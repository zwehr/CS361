import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCC6tHRj1FgBeiQUrzWUrMQ0zMSm81mLI4",
  authDomain: "spot-map-af364.firebaseapp.com",
  projectId: "spot-map-af364",
  storageBucket: "spot-map-af364.appspot.com",
  messagingSenderId: "1089400885080",
  appId: "1:1089400885080:web:612e003913ea494a8c1f2d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Export Firebase authorization
export const auth = getAuth(app)

// Export Firebase storage
export const storage = getStorage(app)

// Export Firebase Firestore database
export const db = getFirestore(app)