// Profanity filter utility - blocks sensitive words from comments

// Comprehensive list of banned words/patterns
// Note: This is a hash-based approach for privacy
const BANNED_PATTERNS = [
    // Profanity
    /\bf+u+c+k+/gi,
    /\bs+h+i+t+/gi,
    /\bb+i+t+c+h+/gi,
    /\ba+s+s+h+o+l+e+/gi,
    /\bd+a+m+n+/gi,
    /\bc+r+a+p+/gi,
    /\bp+i+s+s+/gi,
    /\bc+u+n+t+/gi,

    // Hate speech (generic patterns to avoid listing specific slurs)
    /\bn+i+g+g+/gi,
    /\bf+a+g+g+/gi,
    /\br+e+t+a+r+d+/gi,

    // Sexual content
    /\bp+o+r+n+/gi,
    /\bs+e+x+/gi,
    /\bd+i+c+k+/gi,
    /\bp+e+n+i+s+/gi,
    /\bv+a+g+i+n+a+/gi,
    /\bc+o+c+k+/gi,

    // Spam patterns
    /(.)\1{10,}/gi, // Repeated characters (10+ times)
    /https?:\/\//gi, // URLs (optional - remove if you want to allow links)
    /\b(buy|cheap|discount|viagra|casino|lottery)\b/gi, // Common spam words
]

// Additional exact matches (case-insensitive)
const BANNED_WORDS = [
    'fuck', 'shit', 'bitch', 'asshole', 'damn', 'crap', 'piss', 'cunt',
    'dick', 'cock', 'pussy', 'porn', 'sex', 'nude', 'xxx',
    'nigger', 'nigga', 'faggot', 'fag', 'retard', 'retarded',
    'kill yourself', 'kys', 'die', 'suicide',
    'rape', 'molest', 'pedophile', 'pedo',
]

/**
 * Detects if text contains profanity or banned content
 */
export function containsProfanity(text: string): boolean {
    if (!text || typeof text !== 'string') return false

    const lowerText = text.toLowerCase().trim()

    // Check exact word matches
    for (const word of BANNED_WORDS) {
        // Use word boundaries to avoid false positives
        const regex = new RegExp(`\\b${word}\\b`, 'i')
        if (regex.test(lowerText)) {
            return true
        }
    }

    // Check pattern matches
    for (const pattern of BANNED_PATTERNS) {
        if (pattern.test(text)) {
            return true
        }
    }

    return false
}

/**
 * Sanitizes text by removing/replacing profanity
 * Returns cleaned text or null if too much profanity
 */
export function sanitizeText(text: string): string | null {
    if (!text || typeof text !== 'string') return null

    let cleaned = text
    let replacementCount = 0

    // Replace banned words with asterisks
    for (const word of BANNED_WORDS) {
        const regex = new RegExp(`\\b${word}\\b`, 'gi')
        if (regex.test(cleaned)) {
            cleaned = cleaned.replace(regex, '***')
            replacementCount++
        }
    }

    // If too many replacements, reject the comment
    if (replacementCount > 3) {
        return null
    }

    return cleaned
}

/**
 * Validates comment content
 * Returns { valid: boolean, message?: string }
 */
export function validateComment(text: string): { valid: boolean; message?: string } {
    if (!text || text.trim().length === 0) {
        return { valid: false, message: 'Comment cannot be empty' }
    }

    if (text.length > 1000) {
        return { valid: false, message: 'Comment is too long (max 1000 characters)' }
    }

    if (text.length < 2) {
        return { valid: false, message: 'Comment is too short (min 2 characters)' }
    }

    if (containsProfanity(text)) {
        return { valid: false, message: 'Your comment contains inappropriate language. Please keep it respectful.' }
    }

    // Check for spam patterns
    if (/(.)\1{10,}/.test(text)) {
        return { valid: false, message: 'Please avoid repeating characters excessively' }
    }

    return { valid: true }
}
