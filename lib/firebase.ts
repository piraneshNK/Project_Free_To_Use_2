// Firebase configuration and initialization
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app'
import { getDatabase, Database } from 'firebase/database'

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Check if Firebase is configured
export const isFirebaseConfigured = (): boolean => {
    return !!(
        process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
        process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL
    )
}

// Initialize Firebase (singleton pattern)
let app: FirebaseApp | null = null
let database: Database | null = null

if (isFirebaseConfigured()) {
    try {
        app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()
        database = getDatabase(app)
    } catch (error) {
        console.error("Firebase initialization error:", error)
    }
} else {
    console.warn("Firebase environment variables missing. Database features will be disabled.")
}

export { app, database }

