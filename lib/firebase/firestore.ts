import { getFirestore } from "firebase/firestore";
import { firebaseApp } from "./firebase.client";

export const db = getFirestore(firebaseApp);
