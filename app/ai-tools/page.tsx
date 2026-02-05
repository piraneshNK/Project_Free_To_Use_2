import { Metadata } from "next"
import { AiToolsView } from "@/components/ai-tools-view"
import { BreadcrumbSchema, ItemListSchema } from "@/components/json-ld"
import { getAllTools } from "@/lib/data"

export const metadata: Metadata = {
  title: "Best Free AI Tools Directory (2024) - Writing, Image, Video & More",
  description: "Discover hundreds of the best free AI tools for 2024. Curated directory of free AI writers, image generators, video editors, and coding assistants.",
  openGraph: {
    title: "Best Free AI Tools Directory (2024)",
    description: "Discover hundreds of the best free AI tools for 2024. Curated directory of free AI writers, image generators, video editors, and coding assistants.",
    type: "website",
    url: "https://projectfreetouse.com/ai-tools",
  },
  alternates: {
    canonical: "https://projectfreetouse.com/ai-tools",
  }
}

export default async function AIToolsPage() {
  const tools = await getAllTools()

  // Filter AI tools but exclude LLM models (same logic as before)
  const aiTools = tools.filter(t =>
    t.type === 'app' &&
    !t.tags.some(tag =>
      tag.toLowerCase().includes('llm') ||
      tag.toLowerCase().includes('language model') ||
      tag.toLowerCase().includes('embedding')
    )
  )

  return (
    <div className="pt-16">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://projectfreetouse.com" },
          { name: "AI Tools", url: "https://projectfreetouse.com/ai-tools" }
        ]}
      />
      <ItemListSchema
        name="Best Free AI Tools Directory"
        description="Curated collection of the best free AI tools for writing, image generation, video editing, and productivity."
        items={aiTools.slice(0, 10).map(app => ({
          name: app.name,
          url: `https://projectfreetouse.com/tool/${app.slug}`,
          description: app.description
        }))}
      />

      <AiToolsView initialTools={aiTools} />
    </div>
  )
}
