import { Analytics } from "firebase/analytics";
import { FirebaseApp, FirebaseOptions } from "firebase/app";
import { Firestore } from "firebase/firestore";

export const firebaseConfig: FirebaseOptions = {
    apiKey: "AIzaSyCYC-G5WumeDxCdhgqDYVoGGobHJmrLM8w",
    authDomain: "portfolio-611d6.firebaseapp.com",
    projectId: "portfolio-611d6",
    storageBucket: "portfolio-611d6.appspot.com",
    messagingSenderId: "710185073336",
    appId: "1:710185073336:web:a78d41ac6ba765d0f3924d",
    measurementId: "G-48FQTET3C4",
  };
  
interface FirebaseObject {
    app: FirebaseApp;
    analytics: Analytics;
    db: Firestore;
  }
  
declare global {
    interface Window {
      firebase: FirebaseObject;
    }
  }
  