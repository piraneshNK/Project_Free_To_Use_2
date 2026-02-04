// Saved tools management - stores tool IDs in localStorage
// Tied to device ID for persistence

const SAVED_TOOLS_KEY = 'saved_tools'

export interface SavedTool {
    id: string
    slug: string
    name: string
    savedAt: number // timestamp
}

/**
 * Get all saved tools for current device
 */
export function getSavedTools(): SavedTool[] {
    if (typeof window === 'undefined') return []

    try {
        const saved = localStorage.getItem(SAVED_TOOLS_KEY)
        if (!saved) return []

        return JSON.parse(saved)
    } catch (error) {
        console.error('Error getting saved tools:', error)
        return []
    }
}

/**
 * Save a tool
 */
export function saveTool(id: string, slug: string, name: string): boolean {
    if (typeof window === 'undefined') return false

    try {
        const saved = getSavedTools()

        // Check if already saved
        if (saved.some(tool => tool.id === id)) {
            return false // Already saved
        }

        // Add new tool
        const newTool: SavedTool = {
            id,
            slug,
            name,
            savedAt: Date.now()
        }

        saved.push(newTool)
        localStorage.setItem(SAVED_TOOLS_KEY, JSON.stringify(saved))
        return true
    } catch (error) {
        console.error('Error saving tool:', error)
        return false
    }
}

/**
 * Unsave a tool
 */
export function unsaveTool(id: string): boolean {
    if (typeof window === 'undefined') return false

    try {
        const saved = getSavedTools()
        const filtered = saved.filter(tool => tool.id !== id)

        localStorage.setItem(SAVED_TOOLS_KEY, JSON.stringify(filtered))
        return true
    } catch (error) {
        console.error('Error unsaving tool:', error)
        return false
    }
}

/**
 * Check if a tool is saved
 */
export function isToolSaved(id: string): boolean {
    const saved = getSavedTools()
    return saved.some(tool => tool.id === id)
}

/**
 * Get count of saved tools
 */
export function getSavedToolsCount(): number {
    return getSavedTools().length
}

/**
 * Clear all saved tools (for testing)
 */
export function clearSavedTools(): void {
    if (typeof window === 'undefined') return
    localStorage.removeItem(SAVED_TOOLS_KEY)
}
