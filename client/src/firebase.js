// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "firm-blog.firebaseapp.com",
  projectId: "firm-blog",
  storageBucket: "firm-blog.appspot.com",
  messagingSenderId: "903462521030",
  appId: "1:903462521030:web:a08d913ed0802e42356fc7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);