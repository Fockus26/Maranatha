import { browserLocalPersistence, getAuth, setPersistence } from "firebase/auth";
import { logger } from "@/lib/logger/client";
import { firebaseApp } from "./firebase.client";

export const auth = getAuth(firebaseApp);

setPersistence(auth, browserLocalPersistence).catch(logger.error);
