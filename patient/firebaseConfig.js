// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getMessaging, onMessage } from "firebase/messaging";

const firebaseConfig = {
 apiKey: "AIzaSyDousb649q7tJfOemS4evEyZ5Kc_Z1midE",
 authDomain: "parcha-life.firebaseapp.com",
 projectId: "parcha-life",
 storageBucket: "parcha-life.appspot.com",
 messagingSenderId: "3952706337",
 appId: "1:3952706337:web:bd0e352464366d9cbab460",
 measurementId: "G-WS87P9P081"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging };
