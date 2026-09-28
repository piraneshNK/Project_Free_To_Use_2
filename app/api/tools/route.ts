import { NextResponse } from 'next/server'
import { getToolsForDirectory } from '@/lib/data'

const directories = ["app", "api", "open-source", "patent", "llm"] as const
type Directory = typeof directories[number]

export async function GET(request: Request) {
    try {
        const directory = new URL(request.url).searchParams.get('directory')
        if (!directory || !directories.includes(directory as Directory)) {
            return NextResponse.json({ error: 'A valid directory is required' }, { status: 400 })
        }

        const searchParams = new URL(request.url).searchParams
        const offsetValue = Number(searchParams.get('offset') ?? 0)
        const limitValue = Number(searchParams.get('limit') ?? 200)
        const offset = Number.isSafeInteger(offsetValue) && offsetValue >= 0 ? offsetValue : 0
        const limit = Number.isSafeInteger(limitValue) && limitValue > 0
            ? Math.min(limitValue, 250)
            : 200
        const tools = await getToolsForDirectory(directory as Directory)
        return NextResponse.json(tools.slice(offset, offset + limit), {
            headers: {
                'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
            }
        })
    } catch (error) {
        console.error('Error fetching tools:', error)
        return NextResponse.json({ error: 'Failed to fetch tools' }, { status: 500 })
    }
}
