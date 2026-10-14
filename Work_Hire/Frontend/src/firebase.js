import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBItpOVL8TXV0P4jTxkMBCg31QuSH5ihOw",
  authDomain: "work-hire.firebaseapp.com",
  projectId: "work-hire",
  storageBucket: "work-hire.firebasestorage.app",
  messagingSenderId: "547836134798",
  appId: "1:547836134798:web:7aaec6311f3b883a6790df",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);