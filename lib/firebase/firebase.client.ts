import { getApps, initializeApp } from "firebase/app";

import { envClient } from "@/config/env.client";

const firebaseConfig = {
    apiKey: envClient.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: envClient.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: envClient.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: envClient.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: envClient.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: envClient.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const firebaseApp = getApps()[0] ?? initializeApp(firebaseConfig);
