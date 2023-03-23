import Homepage from "./homepage";
import { FirebaseApp, FirebaseOptions, initializeApp } from "firebase/app";
import { Analytics, getAnalytics } from "firebase/analytics";
import { Firestore, getFirestore } from "firebase/firestore";

function index() {
  return (
    <>
      <Homepage />
    </>
  );
}

export default index;
