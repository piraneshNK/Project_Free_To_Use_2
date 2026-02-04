// Device-based authentication utility
// ONLY DEVICE ID - No display names

const DEVICE_ID_KEY = 'device_id'
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
 * Gets the device ID (read-only)
 * Returns existing ID or generates new one if doesn't exist
 */
export function getDeviceId(): string {
    if (typeof window === 'undefined') return 'guest_device'

    let deviceId = localStorage.getItem(DEVICE_ID_KEY)

    if (!deviceId) {
        deviceId = generateDeviceId()
        localStorage.setItem(DEVICE_ID_KEY, deviceId)
        localStorage.setItem(IS_REGISTERED_KEY, 'true')
    }

    return deviceId
}

/**
 * Checks if user has completed registration (has device ID)
 */
export function isRegistered(): boolean {
    if (typeof window === 'undefined') return false
    return !!localStorage.getItem(DEVICE_ID_KEY)
}

/**
 * Clears everything (for testing/debugging only)
 */
export function clearAll(): void {
    if (typeof window === 'undefined') return
    localStorage.removeItem(DEVICE_ID_KEY)
    localStorage.removeItem(IS_REGISTERED_KEY)
}

/**
 * Get short version of device ID for display (last 8 characters)
 */
export function getShortDeviceId(): string {
    const deviceId = getDeviceId()
    return deviceId.slice(-8)
}
