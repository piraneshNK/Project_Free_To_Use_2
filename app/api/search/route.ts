import { NextResponse } from "next/server"
import { getAllTools } from "@/lib/data"

const MAX_QUERY_LENGTH = 100
const MAX_RESULTS = 8

export async function GET(request: Request) {
    const query = new URL(request.url).searchParams.get("q")?.trim() ?? ""

    if (query.length < 2 || query.length > MAX_QUERY_LENGTH) {
        return NextResponse.json([], { headers: { "Cache-Control": "no-store" } })
    }

    try {
        const terms = query.toLowerCase().split(/\s+/)
        const tools = await getAllTools()
        const results = tools.filter((tool) => {
            const searchableText = `${tool.name} ${tool.category} ${tool.tags.join(" ")}`.toLowerCase()
            return terms.every((term) => searchableText.includes(term))
        }).slice(0, MAX_RESULTS)

        return NextResponse.json(results, {
            headers: { "Cache-Control": "no-store" },
        })
    } catch (error) {
        console.error("Homepage search error:", error)
        return NextResponse.json({ error: "Search is temporarily unavailable" }, { status: 500 })
    }
}