import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCC6tHRj1FgBeiQUrzWUrMQ0zMSm81mLI4",
  authDomain: "spot-map-af364.firebaseapp.com",
  projectId: "spot-map-af364",
  storageBucket: "spot-map-af364.appspot.com",
  messagingSenderId: "1089400885080",
  appId: "1:1089400885080:web:612e003913ea494a8c1f2d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export firestore database
// It will be imported into your react app whenever it is needed
export const db = getFirestore(app);