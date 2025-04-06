// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCDwjscH4pBXKNgo62EaYvZ9WnFBxameO0",
  authDomain: "my-contact-book-project.firebaseapp.com",
  projectId: "my-contact-book-project",
  storageBucket: "my-contact-book-project.firebasestorage.app",
  messagingSenderId: "583771471104",
  appId: "1:583771471104:web:5c88adc12bda98a23147e5",
  measurementId: "G-T1F3SPRHJK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;