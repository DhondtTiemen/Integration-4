import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {  getStorage}  from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCM730gT1sAw0hRLDdGX8ZKeE3j9kaFjc4",
  authDomain: "abbystorage-e70e7.firebaseapp.com",
  projectId: "abbystorage-e70e7",
  storageBucket: "abbystorage-e70e7.firebasestorage.app",
  messagingSenderId: "730420946478",
  appId: "1:730420946478:web:a9b2b8a4ddd0a7cd1061bf",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
export default db;
const storage = getStorage(app);
export { storage };