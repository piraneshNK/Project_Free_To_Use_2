import { NextResponse } from 'next/server'
import { getAllTools } from '@/lib/data'

// Revalidate every hour (3600 seconds)
// This means data is fetched from Google Sheets once, then cached for 1 hour
export const revalidate = 3600

export async function GET() {
    try {
        const tools = await getAllTools()
        return NextResponse.json(tools, {
            headers: {
                'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
            }
        })
    } catch (error) {
        console.error('Error fetching tools:', error)
        return NextResponse.json({ error: 'Failed to fetch tools' }, { status: 500 })
    }
}
