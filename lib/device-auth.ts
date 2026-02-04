// Device-based authentication utility
// UNCHANGEABLE: Both device ID and display name are set once and never change

const COOL_NAMES = [
    "Rediet", "Phoenix", "Nova", "Atlas", "Echo", "Blaze", "Storm", "Luna",
    "Orion", "Sage", "River", "Sky", "Ember", "Frost", "Raven", "Jade",
    "Zephyr", "Aurora", "Titan", "Cipher", "Nexus", "Quantum", "Pixel", "Byte",
    "Spark", "Dash", "Flash", "Bolt", "Thunder", "Shadow", "Ghost", "Phantom",
    "Viper", "Cobra", "Falcon", "Eagle", "Wolf", "Bear", "Tiger", "Dragon",
    "Ace", "Rex", "Max", "Leo", "Kai", "Zara", "Mira", "Nyx", "Onyx", "Ruby"
]

const DEVICE_ID_KEY = 'device_id'
const DISPLAY_NAME_KEY = 'display_name'
const IS_REGISTERED_KEY = 'is_registered'

/**
 * Generates a unique device ID (UUID-like)
 * Format: device_timestamp_randomstring
 */
function generateDeviceId(): string {
    const timestamp = Date.now()
    const random = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    return `device_${timestamp}_${random}`
}

/**
 * Generates a random cool display name
 */
export function generateRandomName(): string {
    return COOL_NAMES[Math.floor(Math.random() * COOL_NAMES.length)]
}

/**
 * Gets the device ID (read-only)
 * Returns existing ID or generates new one if doesn't exist
 */
export function getDeviceId(): string {
    if (typeof window === 'undefined') return 'guest_device'

    let deviceId = localStorage.getItem(DEVICE_ID_KEY)

    if (!deviceId) {
        deviceId = generateDeviceId()
        localStorage.setItem(DEVICE_ID_KEY, deviceId)
    }

    return deviceId
}

/**
 * Gets the display name (read-only)
 * Returns existing name or empty string if not set
 */
export function getDisplayName(): string {
    if (typeof window === 'undefined') return ''
    return localStorage.getItem(DISPLAY_NAME_KEY) || ''
}

/**
 * Sets the display name (ONE TIME ONLY - during registration)
 * This should only be called during initial setup
 */
export function setDisplayName(newName: string): void {
    if (typeof window === 'undefined') return
    if (!newName || newName.trim().length === 0) return

    // Only set if not already registered
    const isRegistered = localStorage.getItem(IS_REGISTERED_KEY)
    if (isRegistered) {
        console.warn('Display name already set and cannot be changed')
        return
    }

    localStorage.setItem(DISPLAY_NAME_KEY, newName.trim())
    localStorage.setItem(IS_REGISTERED_KEY, 'true')
}

/**
 * Gets both device ID and display name
 */
export function getDeviceInfo(): { deviceId: string; displayName: string } {
    return {
        deviceId: getDeviceId(),
        displayName: getDisplayName()
    }
}

/**
 * Checks if user has completed registration
 */
export function isRegistered(): boolean {
    if (typeof window === 'undefined') return false
    return !!localStorage.getItem(IS_REGISTERED_KEY) && !!localStorage.getItem(DISPLAY_NAME_KEY)
}

/**
 * Clears everything (for testing/debugging only - not exposed in UI)
 */
export function clearAll(): void {
    if (typeof window === 'undefined') return
    localStorage.removeItem(DEVICE_ID_KEY)
    localStorage.removeItem(DISPLAY_NAME_KEY)
    localStorage.removeItem(IS_REGISTERED_KEY)
}
