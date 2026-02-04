"use client"

import { useState, useMemo, useEffect } from "react"
import { motion } from "framer-motion"
import { Code } from "lucide-react"
import { ToolCard, type Tool } from "@/components/tool-card"
import { SearchFilter } from "@/components/search-filter"
import { BreadcrumbSchema, ItemListSchema } from "@/components/json-ld"
import { FAQSection } from "@/components/faq-section"

const apiCategories = [
  { id: "ai", label: "AI APIs" },
  { id: "weather", label: "Weather APIs" },
  { id: "finance", label: "Finance APIs" },
  { id: "developer", label: "Developer APIs" },
]

const apiFaqs = [
  {
    question: "What are the best free APIs for developers?",
    answer: "The best free APIs include OpenAI API (free tier), GitHub REST API, OpenWeather API, and Alpha Vantage for finance data. Our directory lists hundreds of free APIs across AI, weather, finance, and developer categories."
  },
  {
    question: "Do these APIs require a credit card?",
    answer: "Most APIs in our directory offer free tiers that don't require a credit card. Some may require registration for an API key, but you won't be charged for basic usage within their free limits."
  },
  {
    question: "How do I integrate these APIs into my project?",
    answer: "Each API listing includes the endpoint URL with a copy button. Click to copy the endpoint, then use it in your HTTP requests. Visit the API's documentation (linked on each page) for authentication details and usage examples."
  },
  {
    question: "What's the difference between free and paid API tiers?",
    answer: "Free API tiers typically have rate limits (requests per minute/day) and may offer fewer features. They're perfect for development, testing, and small projects. Paid tiers offer higher limits, more features, and SLAs for production use."
  },
  {
    question: "Can I use these APIs for commercial projects?",
    answer: "Most APIs allow commercial use on their free tiers, but check each API's terms of service. Some may require attribution or have specific usage restrictions for commercial applications."
  }
]

export default function APIsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [apis, setApis] = useState<Tool[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/tools')
      .then(res => res.json())
      .then((tools: Tool[]) => {
        const apiTools = tools.filter(t => t.type === 'api')
        setApis(apiTools)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error loading APIs:', err)
        setLoading(false)
      })
  }, [])

  const filteredAPIs = useMemo(() => {
    return apis.filter((api) => {
      const matchesSearch =
        searchQuery === "" ||
        api.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        api.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        api.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory =
        selectedCategory === null ||
        api.category.toLowerCase().includes(selectedCategory) ||
        api.tags.some((tag) => tag.toLowerCase().includes(selectedCategory))

      return matchesSearch && matchesCategory
    })
  }, [apis, searchQuery, selectedCategory])

  return (
    <div className="pt-16">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://projectfreetouse.com" },
          { name: "Free APIs", url: "https://projectfreetouse.com/apis" }
        ]}
      />
      <ItemListSchema
        name="Best Free APIs Directory"
        description="Curated collection of free APIs for AI, weather, finance, and development."
        items={filteredAPIs.slice(0, 10).map(api => ({
          name: api.name,
          url: `https://projectfreetouse.com/tool/${api.slug}`,
          description: api.description
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
              <Code className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Best Free APIs Directory</h1>
              <p className="text-muted-foreground">
                Access free APIs for AI, weather, finance, and development projects
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
            The Best Free APIs for Developers in 2024
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Find the perfect <strong className="text-foreground">free API</strong> for your next project.
              Our curated directory features hundreds of free APIs across AI, weather, finance, and developer tools -
              all verified to offer genuine free tiers without credit card requirements.
            </p>
            <p>
              Whether you need <strong className="text-foreground">AI APIs</strong> for natural language processing,
              <strong className="text-foreground"> Weather APIs</strong> for forecasts and historical data,
              <strong className="text-foreground"> Finance APIs</strong> for stock and crypto data, or
              <strong className="text-foreground"> Developer APIs</strong> for GitHub integration and more -
              we have you covered.
            </p>
          </div>
        </motion.div>

        {/* Info Banner */}
        <div className="mb-8 rounded-xl border border-primary/20 bg-primary/5 p-4">
          <p className="text-sm text-foreground">
            <strong className="text-primary">Pro tip:</strong> Each API card includes a copy button for the endpoint URL.
            Click to copy and integrate into your projects quickly.
          </p>
        </div>

        {/* Search and Filters */}
        <SearchFilter
          placeholder="Search free APIs..."
          categories={apiCategories}
          onSearch={setSearchQuery}
          onFilterChange={setSelectedCategory}
          selectedCategory={selectedCategory}
        />

        {/* Results Count */}
        <p className="mb-6 text-sm text-muted-foreground">
          Showing {filteredAPIs.length} {filteredAPIs.length === 1 ? "API" : "APIs"}
          {searchQuery && ` for "${searchQuery}"`}
          {selectedCategory && ` in ${apiCategories.find((c) => c.id === selectedCategory)?.label}`}
        </p>

        {/* APIs Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredAPIs.map((api, index) => (
            <ToolCard key={api.id} tool={api} index={index} />
          ))}
        </div>

        {filteredAPIs.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-lg text-muted-foreground">No APIs found matching your criteria.</p>
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
          title="Frequently Asked Questions About Free APIs"
          faqs={apiFaqs}
        />
      </div>
    </div>
  )
}
