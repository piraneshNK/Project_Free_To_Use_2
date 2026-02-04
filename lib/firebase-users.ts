// Firebase user management - stores device ID and display name
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { db } from './firebase'

export interface User {
    deviceId: string
    displayName: string
    createdAt: Date
}

/**
 * Register a new user in Firebase
 * Saves device ID and display name to Firestore
 */
export async function registerUser(
    deviceId: string,
    displayName: string
): Promise<{ success: boolean; message?: string }> {
    try {
        // Check if user already exists
        const userDoc = await getDoc(doc(db, 'users', deviceId))

        if (userDoc.exists()) {
            return { success: true, message: 'User already registered' }
        }

        // Create new user document
        await setDoc(doc(db, 'users', deviceId), {
            deviceId,
            displayName,
            createdAt: serverTimestamp()
        })

        return { success: true }
    } catch (error) {
        console.error('Error registering user:', error)
        return { success: false, message: 'Failed to register user' }
    }
}

/**
 * Get user data from Firebase
 */
export async function getUser(deviceId: string): Promise<User | null> {
    try {
        const userDoc = await getDoc(doc(db, 'users', deviceId))

        if (!userDoc.exists()) {
            return null
        }

        const data = userDoc.data()
        return {
            deviceId: data.deviceId,
            displayName: data.displayName,
            createdAt: data.createdAt?.toDate() || new Date()
        }
    } catch (error) {
        console.error('Error getting user:', error)
        return null
    }
}

/**
 * Check if a display name is already taken
 */
export async function isDisplayNameTaken(displayName: string): Promise<boolean> {
    // Note: This would require a Firestore query on displayName field
    // For now, we'll allow duplicate display names since device ID is unique
    return false
}
