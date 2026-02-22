import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCS4haX27X6hkKz_XHEhTffVnuwPACceNw",
  authDomain: "ecommerce-app-18efc.firebaseapp.com",
  projectId: "ecommerce-app-18efc",
  storageBucket: "ecommerce-app-18efc.firebasestorage.app",
  messagingSenderId: "456110761076",
  appId: "1:456110761076:web:a2d18b678d1849c2fe1d21",
  measurementId: "G-H5LXH2GB9K"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
