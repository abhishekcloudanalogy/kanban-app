import { config } from "../../middleware";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const FIREBASE_API_KEY = "AIzaSyCQxcf4PGrevdH07ajnBHz7ouuI0afvZGs";
const FIREBASE_PROJECT_ID = "kanban-app-6186d";
const FIREBASE_APP_ID = "1:309042985728:web:1dac80b2939d26305b11e5";
const FIREBASE_MEASUREMENT_ID = "G-TQRTV8WFE0";
const FIREBASE_MESSAGE_SENDER_ID = "309042985728";
const FIREBASE_STORAGE_BUCKET = "kanban-app-6186d.appspot.com";
const FIREBASE_AUTH_DOMAIN = "kanban-app-6186d.firebaseapp.com";
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGE_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID,
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { db, auth, app };
