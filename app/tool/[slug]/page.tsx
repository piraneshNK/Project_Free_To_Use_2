"use client"

import { use } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Star,
  Copy,
  Check,
  Share2,
  Bookmark,
  Globe,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Comments } from "@/components/comments"
import { ToolCard } from "@/components/tool-card"
import { getToolBySlug, sampleTools } from "@/lib/data"
import { useState } from "react"
import { SoftwareApplicationSchema, BreadcrumbSchema } from "@/components/json-ld"

interface ToolPageProps {
  params: Promise<{ slug: string }>
}

export default function ToolPage({ params }: ToolPageProps) {
  const { slug } = use(params)
  const tool = getToolBySlug(slug)
  const [copied, setCopied] = useState(false)
  const [saved, setSaved] = useState(false)

  if (!tool) {
    notFound()
  }

  const handleCopyEndpoint = async () => {
    if (tool.endpoint) {
      await navigator.clipboard.writeText(tool.endpoint)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: tool.name,
        text: tool.description,
        url: window.location.href,
      })
    } else {
      await navigator.clipboard.writeText(window.location.href)
    }
  }

  // Get related tools
  const relatedTools = sampleTools
    .filter((t) => t.id !== tool.id && t.type === tool.type)
    .slice(0, 3)

  const typeLabels = {
    app: "Free App",
    api: "Free API",
    "open-source": "Open Source",
    patent: "Open Patent",
  }

  const backLinks = {
    app: "/apps",
    api: "/apis",
    "open-source": "/open-source",
    patent: "/open-patents",
  }

  return (
    <div className="pt-16">
      <SoftwareApplicationSchema
        name={tool.name}
        description={tool.description}
        url={tool.url}
        category={tool.category}
        applicationCategory={tool.type === "api" ? "DeveloperApplication" : "WebApplication"}
        offers={{ price: "0", priceCurrency: "USD" }}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://projectfreetouse.com" },
          { name: typeLabels[tool.type] + "s", url: `https://projectfreetouse.com${backLinks[tool.type]}` },
          { name: tool.name, url: `https://projectfreetouse.com/tool/${tool.slug}` }
        ]}
      />
      
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        {/* Back Button */}
        <Link
          href={backLinks[tool.type]}
          className="mb-8 inline-flex items-center text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to {typeLabels[tool.type]}s
        </Link>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 rounded-2xl border border-border bg-card p-6 lg:p-8"
            >
              {/* Header */}
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary text-2xl font-bold text-primary">
                    {tool.logoUrl ? (
                      <img
                        src={tool.logoUrl || "/placeholder.svg"}
                        alt={tool.name}
                        className="h-10 w-10 rounded-xl object-contain"
                      />
                    ) : (
                      tool.name.slice(0, 2).toUpperCase()
                    )}
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-foreground lg:text-3xl">{tool.name}</h1>
                    <p className="text-muted-foreground">{tool.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                    {typeLabels[tool.type]}
                  </Badge>
                  {tool.isFree && (
                    <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
                      Free
                    </Badge>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
                {tool.description}
              </p>

              {/* Tags */}
              <div className="mb-6 flex flex-wrap gap-2">
                {tool.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* API Endpoint */}
              {tool.type === "api" && tool.endpoint && (
                <div className="mb-6 rounded-xl border border-border bg-secondary/30 p-4">
                  <p className="mb-2 text-sm font-medium text-foreground">API Endpoint</p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 rounded bg-background px-3 py-2 text-sm text-muted-foreground">
                      {tool.endpoint}
                    </code>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopyEndpoint}
                      className="shrink-0 bg-transparent"
                    >
                      {copied ? (
                        <Check className="h-4 w-4 text-primary" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              )}

              {/* Open Source Stats */}
              {tool.type === "open-source" && (
                <div className="mb-6 flex flex-wrap gap-4">
                  {tool.stars && (
                    <div className="flex items-center gap-2 rounded-xl border border-border bg-secondary/30 px-4 py-2">
                      <Star className="h-5 w-5 text-yellow-500" />
                      <span className="font-medium text-foreground">
                        {tool.stars.toLocaleString()}
                      </span>
                      <span className="text-muted-foreground">stars</span>
                    </div>
                  )}
                  {tool.license && (
                    <div className="flex items-center gap-2 rounded-xl border border-border bg-secondary/30 px-4 py-2">
                      <span className="text-muted-foreground">License:</span>
                      <span className="font-medium text-foreground">{tool.license}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Screenshot Gallery Placeholder */}
              <div className="mb-6">
                <p className="mb-3 text-sm font-medium text-foreground">Screenshots</p>
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2].map((i) => (
                    <div
                      key={i}
                      className="flex aspect-video items-center justify-center rounded-xl border border-border bg-secondary/30"
                    >
                      <span className="text-muted-foreground">Screenshot {i}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <a href={tool.url} target="_blank" rel="noopener noreferrer" className="flex-1 sm:flex-initial">
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 sm:w-auto">
                    {tool.type === "open-source" ? (
                      <>
                        <Github className="mr-2 h-4 w-4" />
                        View on GitHub
                      </>
                    ) : (
                      <>
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Visit Website
                      </>
                    )}
                  </Button>
                </a>
                <Button
                  variant="outline"
                  onClick={() => setSaved(!saved)}
                  className={saved ? "border-primary text-primary" : ""}
                >
                  <Bookmark className={`mr-2 h-4 w-4 ${saved ? "fill-primary" : ""}`} />
                  {saved ? "Saved" : "Save"}
                </Button>
                <Button variant="outline" onClick={handleShare}>
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </motion.div>

            {/* Comments Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Comments toolSlug={slug} />
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <h3 className="mb-4 font-semibold text-foreground">Quick Links</h3>
              <div className="space-y-3">
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
                >
                  <Globe className="h-4 w-4" />
                  Official Website
                </a>
                {tool.type === "open-source" && (
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
                  >
                    <Github className="h-4 w-4" />
                    GitHub Repository
                  </a>
                )}
              </div>
            </motion.div>

            {/* Related Tools */}
            {relatedTools.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="mb-4 font-semibold text-foreground">Related Tools</h3>
                <div className="space-y-4">
                  {relatedTools.map((relatedTool, index) => (
                    <ToolCard key={relatedTool.id} tool={relatedTool} index={index} />
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
