import { Metadata } from "next"
import { AiToolsView } from "@/components/ai-tools-view"
import { BreadcrumbSchema, ItemListSchema } from "@/components/json-ld"
import { getToolsForDirectory } from "@/lib/data"

export const revalidate = 300
const INITIAL_TOOLS = 60

export const metadata: Metadata = {
  title: "Free AI Tools Directory - Writing, Image, Video & More",
  description: "Explore AI tools for writing, image generation, video editing, coding, and productivity. Browse the Project Free To Use directory.",
  openGraph: {
    title: "Free AI Tools Directory - Writing, Image, Video & More",
    description: "Explore AI tools for writing, image generation, video editing, coding, and productivity.",
    type: "website",
    url: "https://projectfreetouse.com/ai-tools",
  },
  alternates: {
    canonical: "https://projectfreetouse.com/ai-tools",
  }
}

export default async function AIToolsPage() {
  const aiTools = await getToolsForDirectory("app", 0, INITIAL_TOOLS)

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
