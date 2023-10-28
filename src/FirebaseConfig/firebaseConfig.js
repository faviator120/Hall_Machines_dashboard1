
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
import 'firebase/compat/auth';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDuZdmUpfgqGehlPhMv36D1pIFyfPGOKkU",
  authDomain: "hhal-machine-inventory.firebaseapp.com",
  databaseURL: "https://hhal-machine-inventory-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "hhal-machine-inventory",
  storageBucket: "hhal-machine-inventory.appspot.com",
  messagingSenderId: "784537139993",
  appId: "1:784537139993:web:bef9112fb5776d653a6388",
    // Add other Firebase config properties here
  };
  
  // Initialize Firebase
  const app =firebase.initializeApp(firebaseConfig);
  export const db = getDatabase(app);
  export const storage = getStorage(app);
  export const auth = getAuth(app);