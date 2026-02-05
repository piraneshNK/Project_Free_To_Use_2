"use client"

import { useState, useMemo, useEffect } from "react"
import { motion } from "framer-motion"
import { GitBranch } from "lucide-react"
import { ToolCard, type Tool } from "@/components/tool-card"
import { SearchFilter } from "@/components/search-filter"
import { BreadcrumbSchema, ItemListSchema } from "@/components/json-ld"
import { FAQSection } from "@/components/faq-section"

const osCategories = [
  { id: "framework", label: "Frameworks" },
  { id: "database", label: "Database" },
  { id: "backend", label: "Backend" },
  { id: "frontend", label: "Frontend" },
  { id: "devtools", label: "Dev Tools" },
]

const licenses = [
  { id: "mit", label: "MIT" },
  { id: "apache", label: "Apache 2.0" },
  { id: "gpl", label: "GPL" },
]

const openSourceFaqs = [
  {
    question: "What is open source software?",
    answer: "Open source software is code that is publicly available for anyone to view, modify, and distribute. Popular licenses include MIT, Apache 2.0, and GPL. Our directory features the best open source projects with permissive licenses."
  },
  {
    question: "What's the difference between MIT and Apache licenses?",
    answer: "MIT is a permissive license with minimal restrictions - you can use the code commercially with attribution. Apache 2.0 is similar but includes patent rights protection. GPL requires derivative works to also be open source."
  },
  {
    question: "Can I use open source software for commercial projects?",
    answer: "Yes! MIT and Apache 2.0 licensed projects can be used commercially. Just check the specific license terms - most require attribution in your documentation or source code."
  },
  {
    question: "How do I contribute to open source projects?",
    answer: "Start by finding a project you're interested in, read their contribution guidelines, and look for 'good first issue' labels. Fork the repository, make your changes, and submit a pull request."
  },
  {
    question: "What are GitHub stars and why do they matter?",
    answer: "GitHub stars indicate community interest and popularity. More stars typically mean better documentation, active maintenance, and community support. Our directory shows star counts to help you find quality projects."
  }
]

export default function OpenSourcePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [openSourceTools, setOpenSourceTools] = useState<Tool[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/tools')
      .then(res => res.json())
      .then((tools: Tool[]) => {
        const osTools = tools.filter(t => t.type === 'open-source')
        setOpenSourceTools(osTools)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error loading open source tools:', err)
        setLoading(false)
      })
  }, [])

  const filteredTools = useMemo(() => {
    return openSourceTools.filter((tool) => {
      const matchesSearch =
        searchQuery === "" ||
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory =
        selectedCategory === null ||
        tool.category.toLowerCase().includes(selectedCategory) ||
        tool.tags.some((tag) => tag.toLowerCase().includes(selectedCategory)) ||
        (tool.license && tool.license.toLowerCase().includes(selectedCategory))

      return matchesSearch && matchesCategory
    })
  }, [openSourceTools, searchQuery, selectedCategory])

  return (
    <div className="pt-16">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://projectfreetouse.com" },
          { name: "Open Source", url: "https://projectfreetouse.com/open-source" }
        ]}
      />
      <ItemListSchema
        name="Best Free Open Source Software Directory"
        description="Curated collection of open source projects with MIT, Apache, and GPL licenses."
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
              <GitBranch className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Best Free Open Source Software Tools</h1>
              <p className="text-muted-foreground">
                Discover high-quality open source projects with permissive licenses
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
            The Ultimate Open Source Software Directory
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Discover the best <strong className="text-foreground">free open source software</strong> projects on the internet.
              Our curated directory features hundreds of high-quality GitHub projects with permissive licenses like
              MIT, Apache 2.0, and GPL - all free to use for personal and commercial projects.
            </p>
            <p>
              Whether you need <strong className="text-foreground">web frameworks</strong> like Next.js and React,
              <strong className="text-foreground"> databases</strong> like Supabase and PostgreSQL,
              <strong className="text-foreground"> CSS frameworks</strong> like Tailwind CSS, or
              <strong className="text-foreground"> developer tools</strong> for building modern applications -
              find everything you need to build faster and smarter.
            </p>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-3 gap-4">
          {[
            { label: "MIT License", count: "500+" },
            { label: "Apache 2.0", count: "300+" },
            { label: "GPL", count: "200+" },
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
          placeholder="Search open source projects..."
          categories={[...osCategories, ...licenses]}
          onSearch={setSearchQuery}
          onFilterChange={setSelectedCategory}
          selectedCategory={selectedCategory}
        />

        {/* Results Count */}
        <p className="mb-6 text-sm text-muted-foreground">
          Showing {filteredTools.length} {filteredTools.length === 1 ? "project" : "projects"}
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
              No open source projects found matching your criteria.
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
          title="Frequently Asked Questions About Open Source Software"
          faqs={openSourceFaqs}
        />
      </div>
    </div>
  )
}
