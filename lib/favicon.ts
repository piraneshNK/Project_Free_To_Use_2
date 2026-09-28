/**
 * Utility functions for working with favicons and logos
 */

/**
 * Extracts the domain from a URL
 */
export function extractDomain(url: string): string {
    try {
        const normalizedUrl = /^[a-z][a-z\d+.-]*:\/\//i.test(url) ? url : `https://${url}`
        const urlObj = new URL(normalizedUrl)
        if (urlObj.protocol !== "http:" && urlObj.protocol !== "https:") return ''
        return urlObj.hostname
    } catch {
        return ''
    }
}

/**
 * Generates a favicon URL using Google's favicon service
 * This service fetches the favicon from any website
 */
// Manual overrides for specific domains where automatic favicon fetching fails or looks bad
const LOGO_OVERRIDES: Record<string, string> = {
    'openai.com': 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
    'chat.openai.com': 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
    'videolan.org': 'https://upload.wikimedia.org/wikipedia/commons/e/e6/VLC_Icon.svg',
    'www.videolan.org': 'https://upload.wikimedia.org/wikipedia/commons/e/e6/VLC_Icon.svg',
    'vlc-project.org': 'https://upload.wikimedia.org/wikipedia/commons/e/e6/VLC_Icon.svg',
}

/**
 * Generates a favicon URL using Google's favicon service
 * This service fetches the favicon from any website
 */
export function getFaviconUrl(websiteUrl: string): string {
    if (!websiteUrl || websiteUrl.startsWith("/")) return ''

    const domain = extractDomain(websiteUrl)
    if (!domain) return ''

    // Check overrides first
    const lowerDomain = domain.toLowerCase().replace(/^www\./, '')
    // Check both full domain and base domain
    if (LOGO_OVERRIDES[domain]) return LOGO_OVERRIDES[domain]
    if (LOGO_OVERRIDES[lowerDomain]) return LOGO_OVERRIDES[lowerDomain]

    // Also check keys that might match parts of the domain (e.g. videolan.org matching www.videolan.org)
    for (const key in LOGO_OVERRIDES) {
        if (domain.includes(key)) return LOGO_OVERRIDES[key]
    }

    // Use Google's favicon service - reliable and fast
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`
}

/**
 * Generates a high-quality favicon URL with fallback
 */
export function getHighQualityFaviconUrl(websiteUrl: string): string {
    if (!websiteUrl) return ''

    const domain = extractDomain(websiteUrl)
    if (!domain) return ''

    // Try to get high-res favicon (128x128)
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`
}
