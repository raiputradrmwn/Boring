import { initializeApp } from "firebase/app";
import {getDatabase, ref, onValue} from "firebase/database";
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAxVHoQT7eyRSIC0ti4gUdTDhggPKuvlHE",
    authDomain: "boring-2d58e.firebaseapp.com",
    databaseURL: "https://boring-2d58e-default-rtdb.firebaseio.com",
    projectId: "boring-2d58e",
    storageBucket: "boring-2d58e.firebasestorage.app",
    messagingSenderId: "82151973436",
    appId: "1:82151973436:web:35d9bbf77609fafdca9939",
    measurementId: "G-N69BMJSMC2"
  };

const app = initializeApp(firebaseConfig); 
const db = getDatabase(app);

export {db, ref, onValue};
