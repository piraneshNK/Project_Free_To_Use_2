"use client"

import { useState, useMemo, useEffect } from "react"
import { motion } from "framer-motion"
import { Lightbulb } from "lucide-react"
import { ToolCard, type Tool } from "@/components/tool-card"
import { SearchFilter } from "@/components/search-filter"
import { BreadcrumbSchema, ItemListSchema } from "@/components/json-ld"
import { FAQSection } from "@/components/faq-section"

const patentCategories = [
  { id: "ai", label: "AI & ML" },
  { id: "blockchain", label: "Blockchain" },
  { id: "iot", label: "IoT" },
  { id: "biotech", label: "Biotech" },
  { id: "software", label: "Software" },
]

const patentFaqs = [
  {
    question: "What are open patents?",
    answer: "Open patents are publicly available patent documents and innovation resources that can be freely accessed, studied, and sometimes used. Our directory features patent databases, prior art search tools, and innovation resources."
  },
  {
    question: "Can I use patented technology for free?",
    answer: "It depends. Some patents are in the public domain after expiration, while others may have open licensing terms. Always check the specific patent status and licensing before commercial use."
  },
  {
    question: "What is prior art and why does it matter?",
    answer: "Prior art refers to existing knowledge or inventions that predate a patent application. It's crucial for determining patent validity and can help you avoid infringing on existing patents."
  },
  {
    question: "How do I search for patents?",
    answer: "Use patent databases like Google Patents, USPTO, or EPO. Search by keywords, patent numbers, or inventors. Our directory lists the best free patent search tools and resources."
  },
  {
    question: "What's the difference between a patent and a trademark?",
    answer: "Patents protect inventions and processes, while trademarks protect brand names and logos. Patents expire after 20 years, while trademarks can be renewed indefinitely."
  }
]

export default function OpenPatentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [patents, setPatents] = useState<Tool[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/tools')
      .then(res => res.json())
      .then((tools: Tool[]) => {
        const patentTools = tools.filter(t => t.type === 'patent')
        setPatents(patentTools)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error loading patents:', err)
        setLoading(false)
      })
  }, [])

  const filteredTools = useMemo(() => {
    return patents.filter((tool) => {
      const matchesSearch =
        searchQuery === "" ||
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory =
        selectedCategory === null ||
        tool.category.toLowerCase().includes(selectedCategory) ||
        tool.tags.some((tag) => tag.toLowerCase().includes(selectedCategory))

      return matchesSearch && matchesCategory
    })
  }, [patents, searchQuery, selectedCategory])

  return (
    <div className="pt-16">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://projectfreetouse.com" },
          { name: "Open Patents", url: "https://projectfreetouse.com/open-patents" }
        ]}
      />
      <ItemListSchema
        name="Best Free Open Patents & Innovation Resources"
        description="Curated collection of patent databases, prior art search tools, and innovation resources."
        items={filteredTools.slice(0, 10).map(tool => ({
          name: tool.name,
          url: `https://projectfreetouse.com/tool/${tool.slug}`,
          description: tool.description
        }))}
      />

      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Lightbulb className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Best Free Open Patents & Innovation Resources</h1>
              <p className="text-muted-foreground">
                Discover patent databases, prior art search tools, and innovation resources
              </p>
            </div>
          </div>
        </motion.div>

        {/* SEO Intro Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 rounded-2xl border border-border bg-card/50 p-6 lg:p-8"
        >
          <h2 className="mb-4 text-xl font-semibold text-foreground">
            The Ultimate Open Patents & Innovation Directory
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Discover the best <strong className="text-foreground">free patent databases</strong> and innovation resources.
              Our curated directory features patent search tools, prior art databases, and innovation resources -
              all free to access for research and commercial use.
            </p>
            <p>
              Whether you need <strong className="text-foreground">patent search tools</strong> like Google Patents,
              <strong className="text-foreground"> prior art databases</strong> for research,
              <strong className="text-foreground"> innovation resources</strong> for startups, or
              <strong className="text-foreground"> patent analytics</strong> for competitive intelligence -
              find everything you need to innovate smarter.
            </p>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-3 gap-4">
          {[
            { label: "Patent DBs", count: "50+" },
            { label: "Search Tools", count: "30+" },
            { label: "Resources", count: "20+" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-border bg-card p-4 text-center"
            >
              <p className="text-2xl font-bold text-primary">{stat.count}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Search and Filters */}
        <SearchFilter
          placeholder="Search patents and innovation resources..."
          categories={patentCategories}
          onSearch={setSearchQuery}
          onFilterChange={setSelectedCategory}
          selectedCategory={selectedCategory}
        />

        {/* Results Count */}
        <p className="mb-6 text-sm text-muted-foreground">
          Showing {filteredTools.length} {filteredTools.length === 1 ? "resource" : "resources"}
          {searchQuery && ` for "${searchQuery}"`}
        </p>

        {/* Projects Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredTools.map((tool, index) => (
            <ToolCard key={tool.id} tool={tool} index={index} />
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-lg text-muted-foreground">
              No patent resources found matching your criteria.
            </p>
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
          title="Frequently Asked Questions About Open Patents"
          faqs={patentFaqs}
        />
      </div>
    </div>
  )
}
