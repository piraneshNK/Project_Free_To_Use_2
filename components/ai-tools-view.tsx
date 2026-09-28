"use client"

import { useState, useMemo } from "react"
import { Brain, Sparkles, ImageIcon, Video, Code, BookOpen, Briefcase } from "lucide-react"
import { motion } from "framer-motion"
import { ToolCard } from "@/components/tool-card"
import type { Tool } from "@/lib/types"
import { SearchFilter } from "@/components/search-filter"
import { FAQSection } from "@/components/faq-section"
import { useDirectoryTools } from "@/hooks/use-directory-tools"

const INITIAL_VISIBLE = 60

const aiCategories = [
    { id: "writing", label: "Writing AI", icon: Sparkles },
    { id: "image", label: "Image AI", icon: ImageIcon },
    { id: "video", label: "Video AI", icon: Video },
    { id: "productivity", label: "Productivity AI", icon: Briefcase },
    { id: "coding", label: "Coding AI", icon: Code },
    { id: "student", label: "Student AI", icon: BookOpen },
]

const aiToolsFaqs = [
    {
        question: "What are the best free AI tools in 2024?",
        answer: "The best free AI tools include ChatGPT (free tier), Claude, Canva AI, Notion AI, and GitHub Copilot. Our directory curates hundreds of free AI tools across writing, image generation, video editing, and productivity categories."
    },
    {
        question: "Are these AI tools really free to use?",
        answer: "Yes! Every AI tool listed in our directory offers a free tier or is completely free. We verify each submission to ensure it provides genuine free access, not just free trials."
    },
    {
        question: "What types of free AI tools are available?",
        answer: "Our directory includes Writing AI (content generators, grammar checkers), Image AI (art generators, photo editors), Video AI (video generators, editors), Productivity AI (automation, scheduling), Coding AI (code assistants, debuggers), and Student AI (study tools, tutoring)."
    },
    {
        question: "How do I choose the right AI tool for my needs?",
        answer: "Use our category filters to narrow down tools by type (writing, image, video, etc.). Read descriptions and user reviews on each tool page. Most tools offer free tiers so you can test before committing."
    },
    {
        question: "Can I submit my free AI tool to this directory?",
        answer: "Absolutely! We welcome submissions of free AI tools. Visit our Submit Tool page, fill out the form with your tool's details, and our team will review it within 48 hours."
    }
]

interface AiToolsViewProps {
    initialTools: Tool[]
}

export function AiToolsView({ initialTools }: AiToolsViewProps) {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
    const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE)
    const { tools, loading } = useDirectoryTools("app", initialTools)

    const filteredApps = useMemo(() => {
        return tools.filter((app) => {
            const matchesSearch =
                searchQuery === "" ||
                app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                app.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                app.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

            const matchesCategory =
                selectedCategory === null ||
                app.category.toLowerCase().replace(/\s+/g, "-") === selectedCategory ||
                app.tags.some((tag) => tag.toLowerCase().replace(/\s+/g, "-") === selectedCategory)

            return matchesSearch && matchesCategory
        })
    }, [tools, searchQuery, selectedCategory])

    return (
        <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Brain className="h-6 w-6" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">Best Free AI Tools Directory</h1>
                        <p className="text-muted-foreground">
                            Discover the best free AI tools for writing, image generation, video editing, and more
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* SEO Intro Content */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-12 rounded-2xl border border-border bg-card/50 p-6 lg:p-8"
            >
                <h2 className="mb-4 text-xl font-semibold text-foreground">
                    The Ultimate Free AI Tools Directory for 2024
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                        Welcome to ProjectFreeToUse, the most comprehensive directory of <strong className="text-foreground">free AI tools</strong> on the internet.
                        Whether you're a developer, content creator, student, or entrepreneur, our curated collection helps you discover
                        powerful AI-powered applications without spending a dime.
                    </p>
                    <p>
                        Our directory features hundreds of verified free AI tools across multiple categories including
                        <strong className="text-foreground"> Writing AI</strong> for content generation and grammar checking,
                        <strong className="text-foreground"> Image AI</strong> for art generation and photo editing,
                        <strong className="text-foreground"> Video AI</strong> for video creation and editing,
                        <strong className="text-foreground"> Coding AI</strong> for code completion and debugging, and
                        <strong className="text-foreground"> Productivity AI</strong> for workflow automation.
                    </p>
                    <p>
                        Every tool in our directory is verified to offer a genuine free tier - no credit card required.
                        We help millions of users discover the best free artificial intelligence tools to boost productivity,
                        enhance creativity, and build amazing projects. Start exploring our AI tools directory today!
                    </p>
                </div>
            </motion.div>

            {/* Search and Filters */}
            <SearchFilter
                placeholder="Search free AI tools..."
                categories={aiCategories.map(c => ({ id: c.id, label: c.label }))}
                onSearch={(value) => { setSearchQuery(value); setVisibleCount(INITIAL_VISIBLE) }}
                onFilterChange={(value) => { setSelectedCategory(value); setVisibleCount(INITIAL_VISIBLE) }}
                selectedCategory={selectedCategory}
            />

            {/* Results Count */}
            <p className="mb-6 text-sm text-muted-foreground">
                Showing {Math.min(visibleCount, filteredApps.length)} of {filteredApps.length} free AI {filteredApps.length === 1 ? "tool" : "tools"}
                {loading && " loaded so far"}
                {searchQuery && ` for "${searchQuery}"`}
                {selectedCategory && ` in ${aiCategories.find((c) => c.id === selectedCategory)?.label}`}
            </p>

            {/* Tools Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredApps.slice(0, visibleCount).map((app, index) => (
                    <ToolCard key={app.id} tool={app} index={index} />
                ))}
            </div>

            {filteredApps.length > visibleCount && (
                <button className="mt-8 rounded-md border border-border px-5 py-2 text-sm font-medium hover:bg-muted" onClick={() => setVisibleCount((count) => count + INITIAL_VISIBLE)}>
                    Show {Math.min(INITIAL_VISIBLE, filteredApps.length - visibleCount)} more AI tools
                </button>
            )}

            {loading && <p className="mt-6 text-center text-sm text-muted-foreground">Loading remaining AI tools...</p>}

            {filteredApps.length === 0 && !loading && (
                <div className="py-16 text-center">
                    <p className="text-lg text-muted-foreground">No AI tools found matching your criteria.</p>
                    <button
                        className="mt-4 text-primary hover:underline"
                        onClick={() => {
                            setSearchQuery("")
                            setSelectedCategory(null)
                        }}
                    >
                        Clear filters
                    </button>
                </div>
            )}

            {/* FAQ Section */}
            <FAQSection
                title="Frequently Asked Questions About Free AI Tools"
                faqs={aiToolsFaqs}
            />
        </div>
    )
}
