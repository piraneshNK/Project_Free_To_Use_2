import Link from "next/link"
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { BreadcrumbSchema } from "@/components/json-ld"

export const metadata = {
  title: "Project Free To Use Blog - Guides for Free Tools & Open Source",
  description: "Expert guides, tutorials, and insights on how to build startups and projects using free AI tools, APIs, open source software, and open patents.",
}

const blogPosts = [
  {
    id: "1",
    slug: "stop-wasting-money-saas-free-alternatives",
    title: "How to Stop Wasting Money on SaaS Subscriptions: The Ultimate Guide to Free Alternatives",
    excerpt:
      "Slash your monthly burn rate by switching to high-quality free and open-source alternatives to popular SaaS products like Notion, Slack, and Adobe Creative Cloud.",
    category: "Cost Savings",
    author: "Alex Chen",
    date: "Feb 4, 2026",
    readTime: "10 min read",
    featured: true,
  },
  {
    id: "2",
    slug: "reliable-free-apis-developers-guide",
    title: "The Exhausted Developer's Guide to Reliable Free APIs in 2026",
    excerpt:
      "Stop wasting time on dead APIs. Discover a curated list of reliable, well-documented, and free APIs for your next project, from weather data to AI endpoints.",
    category: "Development",
    author: "Sarah Miller",
    date: "Feb 3, 2026",
    readTime: "8 min read",
    featured: true,
  },
  {
    id: "3",
    slug: "open-source-licenses-commercial-use-guide",
    title: "Navigating Open Source Licenses: How to Use Free Software Commercially Without Getting Sued",
    excerpt:
      "Confused by MIT, Apache, and GPL? This simple guide explains which open source licenses allow commercial use so you can build with confidence.",
    category: "Legal & Business",
    author: "Mike Johnson",
    date: "Feb 2, 2026",
    readTime: "12 min read",
    featured: false,
  },
  {
    id: "4",
    slug: "curated-free-ai-tech-stack-guide",
    title: "Drowning in AI Tools? Here’s How to Build a Curated, Free AI Tech Stack",
    excerpt:
      "Don't get lost in the AI hype. We've curated a lean, mean, free AI tech stack for content creators, developers, and founders.",
    category: "AI Strategy",
    author: "Alex Chen",
    date: "Feb 1, 2026",
    readTime: "9 min read",
    featured: false,
  },
  {
    id: "5",
    slug: "using-open-patents-startup-innovation",
    title: "Innovation on a Budget: How to Use Open Patents to Accelerate Your Startup",
    excerpt:
      "Patents aren't just for legal battles. Learn how to use open patent databases to find technical solutions, prior art, and expired inventions you can use freely.",
    category: "Innovation",
    author: "Emily Davis",
    date: "Jan 30, 2026",
    readTime: "11 min read",
    featured: false,
  },
]

export default function BlogPage() {
  const featuredPosts = blogPosts.filter((post) => post.featured)
  const regularPosts = blogPosts.filter((post) => !post.featured)

  return (
    <div className="pt-16">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://projectfreetouse.com" },
          { name: "Blog", url: "https://projectfreetouse.com/blog" }
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <BookOpen className="h-6 w-6" />
          </div>
          <h1 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">Blog</h1>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Tips, tutorials, and insights about free tools, open source projects, and building on a budget.
          </p>
        </div>

        {/* Featured Posts */}
        <div className="mb-12">
          <h2 className="mb-6 text-xl font-semibold text-foreground">Featured Articles</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {featuredPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group relative">
                <div className="absolute -inset-0.5 rounded-2xl bg-primary/20 opacity-0 blur transition-opacity group-hover:opacity-100" />
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
            ))}
          </div>
        </div>

        {/* All Posts */}
        <div>
          <h2 className="mb-6 text-xl font-semibold text-foreground">All Articles</h2>
          <div className="space-y-4">
            {regularPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
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
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
