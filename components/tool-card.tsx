"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ExternalLink, Star, Github, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import type { Tool } from "@/lib/types"


interface ToolCardProps {
  tool: Tool
  index?: number
}

export function ToolCard({ tool, index = 0 }: ToolCardProps) {
  const [copied, setCopied] = useState(false)
  const [logoFailed, setLogoFailed] = useState(false)

  const handleCopyEndpoint = async () => {
    if (tool.endpoint) {
      await navigator.clipboard.writeText(tool.endpoint)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="group relative"
    >
      <div className="absolute -inset-0.5 rounded-2xl bg-primary/20 opacity-0 blur transition-opacity group-hover:opacity-100" />
      <div className="relative flex h-full flex-col rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary/50">
        {/* Header */}
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-lg font-bold text-primary">
              {tool.logoUrl && !logoFailed ? (
                <img src={tool.logoUrl} alt={`${tool.name} logo`} className="h-8 w-8 rounded-lg object-contain" onError={() => setLogoFailed(true)} />
              ) : (
                tool.name.slice(0, 2).toUpperCase()
              )}
            </div>
            <div>
              <Link href={`/tool/${tool.slug}`}>
                <h3 className="font-semibold text-foreground transition-colors hover:text-primary">
                  {tool.name}
                </h3>
              </Link>
              <p className="text-xs text-muted-foreground">{tool.category}</p>
            </div>
          </div>
          {tool.isFree && (
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20">Free</Badge>
          )}
        </div>

        {/* Description */}
        <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-2">
          {tool.description}
        </p>

        {/* Tags */}
        <div className="mb-4 flex flex-wrap gap-2">
          {tool.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* API Endpoint (if applicable) */}
        {tool.type === "api" && tool.endpoint && (
          <div className="mb-4 flex items-center gap-2 rounded-lg bg-secondary/50 p-2">
            <code className="flex-1 truncate text-xs text-muted-foreground">{tool.endpoint}</code>
            <button
              onClick={handleCopyEndpoint}
              className="shrink-0 rounded p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>
        )}

        {/* Open Source Stats */}
        {tool.type === "open-source" && (
          <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
            {tool.stars && (
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500" />
                {tool.stars.toLocaleString()}
              </span>
            )}
            {tool.license && (
              <Badge variant="outline" className="text-xs">
                {tool.license}
              </Badge>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link href={`/tool/${tool.slug}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full hover:!bg-primary hover:!text-primary-foreground hover:!border-primary active:!bg-primary active:!text-primary-foreground">
              View Details
            </Button>
          </Link>
          <a href={tool.url} target="_blank" rel="noopener noreferrer">
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <ExternalLink className="h-4 w-4" />
            </Button>
          </a>
          {tool.github && (
            <a href={tool.github} target="_blank" rel="noopener noreferrer">
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Github className="h-4 w-4" />
              </Button>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}
