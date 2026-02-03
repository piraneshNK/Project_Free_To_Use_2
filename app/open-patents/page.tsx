"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Lightbulb, ExternalLink } from "lucide-react"
import { SearchFilter } from "@/components/search-filter"
import { getToolsByType } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BreadcrumbSchema } from "@/components/json-ld"
import { FAQSection } from "@/components/faq-section"

const patentCategories = [
  { id: "technology", label: "Technology" },
  { id: "electric-vehicles", label: "Electric Vehicles" },
  { id: "research", label: "Research" },
  { id: "linux", label: "Linux" },
  { id: "ai", label: "AI & Machine Learning" },
]

const patentFaqs = [
  {
    question: "What are open patents and why do they matter?",
    answer: "Open patents are intellectual property that companies have made freely available for public use. They enable startups, researchers, and developers to build on existing innovations without licensing fees, accelerating technological progress and reducing barriers to entry."
  },
  {
    question: "Can I use Tesla's open patents for my startup?",
    answer: "Yes! Tesla has pledged not to initiate patent lawsuits against anyone using their technology in good faith. This includes electric vehicle technology, battery systems, and charging infrastructure patents."
  },
  {
    question: "How do I search for specific patents?",
    answer: "Use Google Patents (patents.google.com) for comprehensive patent searches. Our directory curates the best open patent resources and pledges from major companies to help you find innovation resources quickly."
  },
  {
    question: "What's the difference between open patents and open source?",
    answer: "Open source refers to software code that's publicly available. Open patents refer to patented inventions that companies have pledged not to enforce, allowing others to use the technology freely."
  },
  {
    question: "Are there open patents for AI and machine learning?",
    answer: "Yes! Companies like IBM and Google have made various AI-related patents available through open pledges. Our directory helps you discover AI patents and innovation resources for your research or startup."
  }
]

export default function OpenPatentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const patents = getToolsByType("patent")

  const filteredPatents = useMemo(() => {
    return patents.filter((patent) => {
      const matchesSearch =
        searchQuery === "" ||
        patent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patent.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patent.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory =
        selectedCategory === null ||
        patent.category.toLowerCase().replace(/\s+/g, "-") === selectedCategory ||
        patent.tags.some((tag) => tag.toLowerCase().replace(/\s+/g, "-") === selectedCategory)

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
              <h1 className="text-3xl font-bold text-foreground">Open Patents & Innovation Resources</h1>
              <p className="text-muted-foreground">
                Free patents, open inventions, and research-ready innovation resources
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
            The Open Patents Directory: Innovation Without Barriers
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Welcome to the most comprehensive directory of <strong className="text-foreground">open patents</strong> and 
              freely available innovation resources. Our curated collection helps startups, researchers, and developers 
              discover patented technologies that companies have pledged to share freely with the world.
            </p>
            <p>
              From <strong className="text-foreground">Tesla's electric vehicle patents</strong> to 
              <strong className="text-foreground"> IBM's technology pledges</strong> and 
              <strong className="text-foreground"> Open Invention Network's Linux protection</strong> - 
              find the intellectual property resources you need to build groundbreaking products without licensing barriers.
            </p>
            <p>
              Open patents represent a revolutionary shift in how companies approach innovation. By sharing their patented 
              technologies, industry leaders enable faster progress, reduce development costs, and create opportunities 
              for entrepreneurs worldwide to build on proven innovations.
            </p>
          </div>
        </motion.div>

        {/* Info Banner */}
        <div className="mb-8 rounded-xl border border-primary/20 bg-primary/5 p-6">
          <h3 className="mb-2 font-semibold text-foreground">What are Open Patents?</h3>
          <p className="text-sm text-muted-foreground">
            Open patents are intellectual property that companies and organizations have made freely 
            available for use. This enables startups, researchers, and developers to build upon 
            existing innovations without licensing fees or legal barriers.
          </p>
        </div>

        {/* Search and Filters */}
        <SearchFilter
          placeholder="Search open patents and innovations..."
          categories={patentCategories}
          onSearch={setSearchQuery}
          onFilterChange={setSelectedCategory}
          selectedCategory={selectedCategory}
        />

        {/* Results Count */}
        <p className="mb-6 text-sm text-muted-foreground">
          Showing {filteredPatents.length} {filteredPatents.length === 1 ? "patent" : "patents"}
          {searchQuery && ` for "${searchQuery}"`}
        </p>

        {/* Patents Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPatents.map((patent, index) => (
            <motion.div
              key={patent.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group relative"
            >
              <div className="absolute -inset-0.5 rounded-2xl bg-primary/20 opacity-0 blur transition-opacity group-hover:opacity-100" />
              <div className="relative flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/50">
                {/* Category Tag */}
                <Badge className="mb-4 w-fit bg-primary/10 text-primary hover:bg-primary/20">
                  {patent.category}
                </Badge>

                {/* Title */}
                <Link href={`/tool/${patent.slug}`}>
                  <h3 className="mb-3 text-xl font-semibold text-foreground transition-colors hover:text-primary">
                    {patent.name}
                  </h3>
                </Link>

                {/* Description */}
                <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {patent.description}
                </p>

                {/* Tags */}
                <div className="mb-4 flex flex-wrap gap-2">
                  {patent.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Link href={`/tool/${patent.slug}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      View Details
                    </Button>
                  </Link>
                  <a href={patent.url} target="_blank" rel="noopener noreferrer">
                    <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredPatents.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-lg text-muted-foreground">
              No patents found matching your criteria.
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
