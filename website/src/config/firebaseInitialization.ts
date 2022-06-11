// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  databaseUrl: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID,
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Analytics
// NOTE: Disabled because it was not needed after the project pivot
// export const firebaseAnalytics = getAnalytics(firebaseApp);

// Initialize Firebase Auth
// NOTE: Disabled because it was not needed after the project pivot
// export const firebaseAuth = getAuth(firebaseApp);

// Initialize Firestore
// NOTE: Disabled because it was not needed after the project pivot
// const firestoreTemp = getFirestore(firebaseApp);

// Initialize Firebase Functions
export const firebaseFunctions = getFunctions(firebaseApp);

// Initialize Storage
// NOTE: Disabled because it was not needed after the project pivot
// export const firebaseStorage = getStorage(firebaseApp);

// Configure emulators if not in a production environment
if (process.env.NODE_ENV !== "production") {
  // connectAuthEmulator(firebaseAuth, "http://localhost:9099");
  // connectFirestoreEmulator(firestoreTemp, "localhost", 8080);
  connectFunctionsEmulator(firebaseFunctions, "localhost", 5001);
  // connectStorageEmulator(firebaseStorage, "localhost", 9199);
}

// Configure the hackathon-specific directory for Firestore
// NOTE: Disabled because it was not needed after the project pivot
/* export const firebaseFirestore = doc(
  firestoreTemp,
  "/hackathons/CostalHacks2022/"
); */
