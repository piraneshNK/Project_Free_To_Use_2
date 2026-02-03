"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const blogPosts = [
  {
    id: "1",
    slug: "top-free-ai-tools-2024",
    title: "Top 10 Free AI Tools for Developers in 2024",
    excerpt:
      "Discover the best free AI tools that can supercharge your development workflow. From code assistants to image generation, we've curated the top picks.",
    category: "AI Tools",
    author: "Alex Chen",
    date: "Jan 15, 2024",
    readTime: "5 min read",
    featured: true,
  },
  {
    id: "2",
    slug: "free-apis-every-developer-should-know",
    title: "Free APIs Every Developer Should Know About",
    excerpt:
      "A comprehensive guide to free APIs that can help you build amazing applications without breaking the bank.",
    category: "APIs",
    author: "Sarah Miller",
    date: "Jan 12, 2024",
    readTime: "8 min read",
    featured: true,
  },
  {
    id: "3",
    slug: "open-source-alternatives-to-popular-saas",
    title: "Open Source Alternatives to Popular SaaS Products",
    excerpt:
      "Looking to cut costs? Here are self-hosted open source alternatives to Notion, Slack, and other popular tools.",
    category: "Open Source",
    author: "Mike Johnson",
    date: "Jan 10, 2024",
    readTime: "6 min read",
    featured: false,
  },
  {
    id: "4",
    slug: "understanding-open-patents",
    title: "Understanding Open Patents: A Guide for Startups",
    excerpt:
      "Learn how open patents work and how your startup can leverage them for innovation without legal concerns.",
    category: "Patents",
    author: "Emily Davis",
    date: "Jan 8, 2024",
    readTime: "7 min read",
    featured: false,
  },
  {
    id: "5",
    slug: "free-design-tools-for-startups",
    title: "Best Free Design Tools for Cash-Strapped Startups",
    excerpt:
      "Create professional designs without expensive software. These free tools rival Figma, Canva, and Adobe.",
    category: "Design",
    author: "Alex Chen",
    date: "Jan 5, 2024",
    readTime: "4 min read",
    featured: false,
  },
]

export default function BlogPage() {
  const featuredPosts = blogPosts.filter((post) => post.featured)
  const regularPosts = blogPosts.filter((post) => !post.featured)

  return (
    <div className="pt-16">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <BookOpen className="h-6 w-6" />
          </div>
          <h1 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">Blog</h1>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Tips, tutorials, and insights about free tools, open source projects, and building on a budget.
          </p>
        </motion.div>

        {/* Featured Posts */}
        <div className="mb-12">
          <h2 className="mb-6 text-xl font-semibold text-foreground">Featured Articles</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {featuredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <div className="absolute -inset-0.5 rounded-2xl bg-primary/20 opacity-0 blur transition-opacity group-hover:opacity-100" />
                <Link href={`/blog/${post.slug}`}>
                  <div className="relative flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/50">
                    <div className="mb-4 flex items-center gap-2">
                      <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                        {post.category}
                      </Badge>
                      <Badge variant="outline">Featured</Badge>
                    </div>
                    <h3 className="mb-3 text-xl font-semibold text-foreground group-hover:text-primary">
                      {post.title}
                    </h3>
                    <p className="mb-4 flex-1 text-muted-foreground">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {post.readTime}
                        </span>
                      </div>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>

        {/* All Posts */}
        <div>
          <h2 className="mb-6 text-xl font-semibold text-foreground">All Articles</h2>
          <div className="space-y-4">
            {regularPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="flex items-center justify-between rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/50">
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {post.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{post.date}</span>
                      </div>
                      <h3 className="font-medium text-foreground group-hover:text-primary">
                        {post.title}
                      </h3>
                    </div>
                    <div className="ml-4 flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {post.readTime}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
