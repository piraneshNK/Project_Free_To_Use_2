// Comment service for Firestore operations with profanity filtering
import {
    collection,
    addDoc,
    query,
    where,
    orderBy,
    getDocs,
    deleteDoc,
    doc,
    serverTimestamp,
    Timestamp
} from 'firebase/firestore'
import { db } from './firebase'
import { validateComment } from './profanity-filter'

export interface Comment {
    id: string
    toolSlug: string
    deviceId: string
    displayName: string
    content: string
    timestamp: Date
}

/**
 * Add a new comment to Firestore (with profanity check)
 */
export async function addComment(
    toolSlug: string,
    deviceId: string,
    displayName: string,
    content: string
): Promise<{ success: boolean; message?: string; id?: string }> {
    // Validate content (includes profanity check)
    const validation = validateComment(content)
    if (!validation.valid) {
        return { success: false, message: validation.message }
    }

    try {
        const docRef = await addDoc(collection(db, 'comments'), {
            toolSlug,
            deviceId,
            displayName,
            content: content.trim(),
            timestamp: serverTimestamp()
        })

        return { success: true, id: docRef.id }
    } catch (error) {
        console.error('Error adding comment:', error)
        return { success: false, message: 'Failed to post comment. Please try again.' }
    }
}

/**
 * Get all comments for a specific tool
 */
export async function getComments(toolSlug: string): Promise<Comment[]> {
    try {
        const q = query(
            collection(db, 'comments'),
            where('toolSlug', '==', toolSlug),
            orderBy('timestamp', 'desc')
        )

        const querySnapshot = await getDocs(q)
        const comments: Comment[] = []

        querySnapshot.forEach((doc) => {
            const data = doc.data()
            comments.push({
                id: doc.id,
                toolSlug: data.toolSlug,
                deviceId: data.deviceId,
                displayName: data.displayName,
                content: data.content,
                timestamp: data.timestamp?.toDate() || new Date()
            })
        })

        return comments
    } catch (error) {
        console.error('Error getting comments:', error)
        return []
    }
}

/**
 * Delete a comment (only if deviceId matches)
 */
export async function deleteComment(
    commentId: string,
    deviceId: string
): Promise<{ success: boolean; message?: string }> {
    try {
        // First, verify the comment belongs to this device
        const comments = await getDocs(
            query(collection(db, 'comments'), where('deviceId', '==', deviceId))
        )

        let canDelete = false
        comments.forEach((docSnapshot) => {
            if (docSnapshot.id === commentId) {
                canDelete = true
            }
        })

        if (!canDelete) {
            return { success: false, message: 'You can only delete your own comments' }
        }

        await deleteDoc(doc(db, 'comments', commentId))
        return { success: true }
    } catch (error) {
        console.error('Error deleting comment:', error)
        return { success: false, message: 'Failed to delete comment' }
    }
}

/**
 * Get comment count for a tool
 */
export async function getCommentCount(toolSlug: string): Promise<number> {
    try {
        const q = query(
            collection(db, 'comments'),
            where('toolSlug', '==', toolSlug)
        )
        const querySnapshot = await getDocs(q)
        return querySnapshot.size
    } catch (error) {
        console.error('Error getting comment count:', error)
        return 0
    }
}
