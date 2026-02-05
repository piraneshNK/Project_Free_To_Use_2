import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Brain, Code, GitBranch, Lightbulb } from "lucide-react"
import { ToolCard } from "@/components/tool-card"
import { getAllTools } from "@/lib/data"
import { Tool } from "@/lib/types"

export const metadata: Metadata = {
    title: "Search Results - Project Free To Use",
    description: "Search results for free AI tools, APIs, open source software, and patents.",
    robots: "noindex, follow"
}

export default async function SearchPage({
    searchParams,
}: {
    searchParams: Promise<{ q: string }>
}) {
    const { q } = await searchParams
    const query = q?.toLowerCase() || ""
    const allTools = await getAllTools()

    const searchTools = (tools: Tool[], q: string) => {
        if (!q) return []
        const searchTerms = q.toLowerCase().trim().split(/\s+/)
        return tools.filter((tool) => {
            const searchableText = `${tool.name} ${tool.category} ${tool.tags.join(" ")}`.toLowerCase()
            return searchTerms.every(term => searchableText.includes(term))
        })
    }

    const filteredTools = searchTools(allTools, query)
    const popularTools = allTools.slice(0, 4) // Fallback tools

    return (
        <div className="min-h-screen pt-20 pb-16">
            <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
                {/* Back Button */}
                <div className="mb-6">
                    <Link
                        href="/"
                        className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Home
                    </Link>
                </div>

                {/* Results Header */}
                <div className="mb-12">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
                        Search Results
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        {query
                            ? filteredTools.length > 0
                                ? `Found ${filteredTools.length} results for "${q}"`
                                : `No exact matches for "${q}"`
                            : "Enter a search term to find free tools."}
                    </p>
                </div>

                {/* Results Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredTools.length > 0 ? (
                        filteredTools.map((tool, index) => (
                            <ToolCard key={tool.id} tool={tool} index={index} />
                        ))
                    ) : (
                        <div className="col-span-full">
                            <div className="py-12 text-center rounded-2xl border border-border bg-card/50 mb-12">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                                    <Brain className="h-8 w-8 text-muted-foreground" />
                                </div>
                                <h3 className="text-lg font-semibold text-foreground mb-2">No exact matches found</h3>
                                <p className="text-muted-foreground max-w-sm mx-auto mb-8">
                                    We couldn't find any tools matching "{q}". But here are some popular tools you might like:
                                </p>
                            </div>

                            {/* Fallback Recommendations */}
                            <h2 className="text-2xl font-bold text-foreground mb-6">Popular Tools</h2>
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {popularTools.map((tool, index) => (
                                    <ToolCard key={`fallback-${tool.id}`} tool={tool} index={index} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
