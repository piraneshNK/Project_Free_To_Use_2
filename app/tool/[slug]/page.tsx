import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  Github,
  Globe
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ToolCard } from "@/components/tool-card"
import { ToolActions } from "@/components/tool-actions"
import { ScreenshotPreview } from "@/components/screenshot-preview"
import { SoftwareApplicationSchema, BreadcrumbSchema } from "@/components/json-ld"
import { getAllTools, getRelatedTools } from "@/lib/data"
import { slugify } from "@/lib/transform"

interface ToolPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { slug } = await params
  const tools = await getAllTools()
  const tool = tools.find((t) => (t.slug || slugify(t.name)) === slug)

  if (!tool) {
    return {
      title: "Tool Not Found",
    }
  }

  const title = `${tool.name} - Free AI Tool | Project Free To Use`
  const description = tool.description || `Use ${tool.name} for free. Discover more free AI tools, APIs, and open source software at Project Free To Use.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://projectfreetouse.com/tool/${slug}`,
      siteName: "Project Free To Use",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `https://projectfreetouse.com/tool/${slug}`,
    }
  }
}

export async function generateStaticParams() {
  const tools = await getAllTools()
  return tools.map((tool) => ({
    slug: tool.slug || slugify(tool.name),
  }))
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params
  const tools = await getAllTools()
  const tool = tools.find((t) => (t.slug || slugify(t.name)) === slug)

  if (!tool) {
    notFound()
  }

  // Get related tools (same category)
  const relatedTools = await getRelatedTools(tool)

  return (
    <div className="min-h-screen pt-20 pb-16">
      <SoftwareApplicationSchema
        name={tool.name}
        description={tool.description}
        url={tool.url}
        category={tool.category}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://projectfreetouse.com" },
          { name: "Tools", url: "https://projectfreetouse.com/ai-tools" },
          { name: tool.name, url: `https://projectfreetouse.com/tool/${slug}` }
        ]}
      />

      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-border/40 bg-card/30 pb-12 pt-8">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <Link
            href="/ai-tools"
            className="mb-8 inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to AI Tools
          </Link>

          <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
            <div className="lg:col-span-2">
              <div className="flex flex-col gap-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
                      {tool.name}
                    </h1>
                    <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                      <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                        {tool.category}
                      </Badge>
                      {/* Removed tool.subcategory check as it doesn't exist on Tool type */}
                      {tool.pricing && (
                        <Badge variant="outline" className="text-green-500 border-green-500/20 bg-green-500/5">
                          {tool.pricing}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <p className="text-lg leading-relaxed text-muted-foreground">
                  {tool.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {tool.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-secondary/50">
                      #{tag}
                    </Badge>
                  ))}
                </div>

                <ToolActions slug={slug} url={tool.url} />
              </div>
            </div>

            {/* Sidebar Stats/Info */}
            <div className="space-y-6">
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="mb-4 font-semibold text-foreground">Tool Details</h3>
                <dl className="space-y-4 text-sm">
                  {tool.pricing && (
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <dt className="text-muted-foreground">Pricing</dt>
                      <dd className="font-medium text-foreground">{tool.pricing}</dd>
                    </div>
                  )}
                  {tool.github && (
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <dt className="text-muted-foreground">Open Source</dt>
                      <dd className="font-medium text-foreground">Yes</dd>
                    </div>
                  )}
                  <div className="pt-2">
                    <a
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-primary hover:underline"
                    >
                      <Globe className="h-4 w-4" />
                      Official Website
                    </a>
                  </div>
                  {tool.github && (
                    <div className="pt-2">
                      <a
                        href={tool.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-primary hover:underline"
                      >
                        <Github className="h-4 w-4" />
                        GitHub Repository
                      </a>
                    </div>
                  )}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-12">
            {/* Screenshots Placeholder */}
            <section>
              <h2 className="mb-6 text-2xl font-bold text-foreground">Preview</h2>
              <div className="aspect-video overflow-hidden rounded-2xl border border-border bg-muted/30 relative group">
                <ScreenshotPreview url={tool.url} name={tool.name} />
              </div>
            </section>


          </div>

          {/* Related Tools */}
          <div className="lg:col-span-1">
            <h2 className="mb-6 text-xl font-bold text-foreground">Related Tools</h2>
            <div className="grid gap-6">
              {relatedTools.slice(0, 3).map((relatedTool, index) => (
                <ToolCard key={relatedTool.id} tool={relatedTool} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
