"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Search, Sparkles, Code, GitBranch, Lightbulb, ArrowRight, Zap, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ToolCard } from "@/components/tool-card"
import { sampleTools } from "@/lib/data"
import { WebsiteSchema, OrganizationSchema } from "@/components/json-ld"
import { FAQSection } from "@/components/faq-section"

const categoryChips = [
  { label: "AI Tools", href: "/ai-tools", icon: Brain },
  { label: "APIs", href: "/apis", icon: Code },
  { label: "Open Source", href: "/open-source", icon: GitBranch },
  { label: "Patents", href: "/open-patents", icon: Lightbulb },
  { label: "Writing AI", href: "/ai-tools?category=writing", icon: Sparkles },
]

const homeFaqs = [
  {
    question: "What is ProjectFreeToUse?",
    answer: "ProjectFreeToUse is the world's largest curated directory of free AI tools, APIs, open source software, and open patents. We help developers, students, and startups discover free resources to build faster, smarter, and cheaper."
  },
  {
    question: "Are all the tools on this platform really free?",
    answer: "Yes! Every tool listed on ProjectFreeToUse offers a free tier or is completely free to use. We verify each submission to ensure it meets our free-to-use criteria before adding it to our directory."
  },
  {
    question: "How do I submit a tool to the directory?",
    answer: "You can submit your free AI tool, API, open source project, or patent through our Submit Tool page. Our team reviews each submission within 48 hours to ensure quality and relevance."
  },
  {
    question: "What types of tools can I find here?",
    answer: "Our directory includes free AI tools for writing, image generation, video editing, and productivity. We also list free developer APIs, open source projects with MIT/Apache licenses, and publicly available patents and innovation resources."
  },
  {
    question: "Is ProjectFreeToUse free to use?",
    answer: "Absolutely! ProjectFreeToUse is 100% free. We believe in democratizing access to technology resources. Browse, search, and discover unlimited free tools without any registration required."
  }
]

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const trendingTools = sampleTools.slice(0, 8)

  const filteredTools = searchQuery
    ? sampleTools.filter(
        (tool) =>
          tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tool.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : trendingTools

  return (
    <div className="pt-16">
      <WebsiteSchema />
      <OrganizationSchema />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute right-0 top-1/4 h-[300px] w-[300px] rounded-full bg-primary/10 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-4 py-20 lg:px-8 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Badge className="mb-6 border-primary/30 bg-primary/10 px-4 py-1.5 text-primary hover:bg-primary/20">
                <Sparkles className="mr-2 h-3 w-3" />
                Curated Free Resources for Builders
              </Badge>
            </motion.div>

            {/* Headline */}
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              <span className="text-balance">Discover the Best Free AI Tools,</span>
              <br />
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                APIs & Open Innovation Resources
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mb-8 text-lg text-muted-foreground lg:text-xl">
              ProjectFreeToUse helps developers, students, and startups find free AI tools,
              <br className="hidden sm:block" />
              free APIs, open source software, and public patents.
            </p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mx-auto mb-8 max-w-xl"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search free tools, APIs, open source..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-14 rounded-2xl border-border bg-card pl-12 pr-4 text-foreground shadow-lg shadow-black/5 transition-shadow focus:shadow-xl focus:shadow-primary/5"
                />
              </div>
            </motion.div>

            {/* Category Chips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-2"
            >
              {categoryChips.map((chip) => (
                <Link key={chip.href} href={chip.href}>
                  <Button
                    variant="outline"
                    className="rounded-full border-border bg-card/50 text-muted-foreground hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
                  >
                    <chip.icon className="mr-2 h-4 w-4" />
                    {chip.label}
                  </Button>
                </Link>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-border bg-card/30">
        <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { label: "Free Apps", value: "500+" },
              { label: "APIs", value: "200+" },
              { label: "Open Source", value: "1K+" },
              { label: "Patents", value: "100+" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="text-center"
              >
                <p className="text-3xl font-bold text-primary lg:text-4xl">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Tools Section */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mb-12 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground lg:text-3xl">
                {searchQuery ? "Search Results" : "Trending Tools"}
              </h2>
              <p className="mt-2 text-muted-foreground">
                {searchQuery
                  ? `Found ${filteredTools.length} results for "${searchQuery}"`
                  : "Discover the most popular free resources"}
              </p>
            </div>
            {!searchQuery && (
              <Link href="/ai-tools">
                <Button variant="ghost" className="text-primary hover:bg-primary/10">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredTools.map((tool, index) => (
              <ToolCard key={tool.id} tool={tool} index={index} />
            ))}
          </div>

          {filteredTools.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-lg text-muted-foreground">No tools found matching your search.</p>
              <Button
                variant="ghost"
                className="mt-4 text-primary"
                onClick={() => setSearchQuery("")}
              >
                Clear search
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Featured Categories */}
      <section className="border-t border-border bg-card/30 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-bold text-foreground lg:text-3xl">Browse by Category</h2>
            <p className="mt-2 text-muted-foreground">
              Find the perfect tool for your next project
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Free AI Tools",
                description: "Writing, image, video, productivity AI tools",
                href: "/ai-tools",
                icon: Brain,
                count: "500+",
              },
              {
                title: "Free APIs",
                description: "AI, weather, finance, developer APIs",
                href: "/apis",
                icon: Code,
                count: "200+",
              },
              {
                title: "Open Source",
                description: "GitHub projects with MIT, Apache licenses",
                href: "/open-source",
                icon: GitBranch,
                count: "1K+",
              },
              {
                title: "Open Patents",
                description: "Free patents and innovation resources",
                href: "/open-patents",
                icon: Lightbulb,
                count: "100+",
              },
            ].map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Link href={category.href}>
                  <div className="group relative h-full">
                    <div className="absolute -inset-0.5 rounded-2xl bg-primary/20 opacity-0 blur transition-opacity group-hover:opacity-100" />
                    <div className="relative flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/50">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <category.icon className="h-6 w-6" />
                      </div>
                      <h3 className="mb-2 font-semibold text-foreground">{category.title}</h3>
                      <p className="mb-4 flex-1 text-sm text-muted-foreground">
                        {category.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-primary">{category.count} tools</span>
                        <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-t border-border bg-card/30">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <FAQSection faqs={homeFaqs} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 lg:p-12">
            <div className="absolute -right-20 -top-20 h-[300px] w-[300px] rounded-full bg-primary/10 blur-3xl" />
            <div className="relative z-10 mx-auto max-w-2xl text-center">
              <h2 className="mb-4 text-2xl font-bold text-foreground lg:text-3xl">
                Have a free tool to share?
              </h2>
              <p className="mb-8 text-muted-foreground">
                Submit your free app, API, open source project, or patent to help other builders
                discover amazing resources.
              </p>
              <Link href="/submit">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Submit Your Tool
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
