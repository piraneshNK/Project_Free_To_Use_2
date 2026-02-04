// Google Sheets data fetching utilities

const GOOGLE_SHEETS_ID = '1baS2f7drxK0VoLidiAGJ_6Kp8NMMbweEFC0X-YQZ-xQ'

export type SheetName = 'ai_tools' | 'apis' | 'open_software' | 'open_patterns' | 'llm_models'

/**
 * Fetches CSV data from a specific Google Sheets tab
 */
export async function fetchSheetData(sheetName: SheetName): Promise<string> {
    const url = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEETS_ID}/gviz/tq?tqx=out:csv&sheet=${sheetName}`

    try {
        const response = await fetch(url, {
            next: { revalidate: 3600 } // Cache for 1 hour
        })

        if (!response.ok) {
            throw new Error(`Failed to fetch ${sheetName}: ${response.statusText}`)
        }

        return await response.text()
    } catch (error) {
        console.error(`Error fetching sheet ${sheetName}:`, error)
        throw error
    }
}

/**
 * Parses CSV text into an array of objects
 */
export function parseCSV<T>(csvText: string): T[] {
    const lines = csvText.split('\n').filter(line => line.trim())

    if (lines.length === 0) {
        return []
    }

    // Parse header row
    const headers = parseCSVLine(lines[0])

    // Parse data rows
    const data: T[] = []
    for (let i = 1; i < lines.length; i++) {
        const values = parseCSVLine(lines[i])

        if (values.length === 0) continue

        const row: any = {}
        headers.forEach((header, index) => {
            row[header] = values[index] || ''
        })

        data.push(row as T)
    }

    return data
}

/**
 * Parses a single CSV line, handling quoted values
 */
function parseCSVLine(line: string): string[] {
    const result: string[] = []
    let current = ''
    let inQuotes = false

    for (let i = 0; i < line.length; i++) {
        const char = line[i]
        const nextChar = line[i + 1]

        if (char === '"') {
            if (inQuotes && nextChar === '"') {
                // Escaped quote
                current += '"'
                i++ // Skip next quote
            } else {
                // Toggle quote state
                inQuotes = !inQuotes
            }
        } else if (char === ',' && !inQuotes) {
            // End of field
            result.push(current)
            current = ''
        } else {
            current += char
        }
    }

    // Add last field
    result.push(current)

    return result
}

/**
 * Fetches and parses data from a Google Sheets tab
 */
export async function getSheetData<T>(sheetName: SheetName): Promise<T[]> {
    const csvText = await fetchSheetData(sheetName)
    return parseCSV<T>(csvText)
}
