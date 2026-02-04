// Firebase user management - stores only device ID
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { db } from './firebase'

export interface User {
    deviceId: string
    createdAt: Date
}

/**
 * Register a new user in Firebase (device ID only)
 */
export async function registerUser(
    deviceId: string
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
            createdAt: data.createdAt?.toDate() || new Date()
        }
    } catch (error) {
        console.error('Error getting user:', error)
        return null
    }
}
