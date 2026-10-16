import { NextResponse } from "next/server"
import { getSitemapEntries, renderUrlSet, SITEMAP_URL_LIMIT } from "@/lib/sitemap"

export const dynamic = "force-dynamic"

interface SitemapPartProps {
  params: Promise<{ id: string }>
}

export async function GET(_request: Request, { params }: SitemapPartProps) {
  try {
    const id = (await params).id.match(/^(\d+)\.xml$/)?.[1]
    const index = id === undefined ? -1 : Number(id)
    if (!Number.isSafeInteger(index) || index < 0) {
      return new NextResponse("Sitemap not found", { status: 404 })
    }

    const entries = await getSitemapEntries()
    const offset = index * SITEMAP_URL_LIMIT
    if (entries.length <= SITEMAP_URL_LIMIT || offset >= entries.length) {
      return new NextResponse("Sitemap not found", { status: 404 })
    }

    return new NextResponse(
      renderUrlSet(entries.slice(offset, offset + SITEMAP_URL_LIMIT)),
      {
        headers: {
          "Content-Type": "application/xml",
          "Cache-Control": "no-store",
        },
      },
    )
  } catch (error) {
    console.error("Error generating sitemap partition:", error)
    return new NextResponse("Error generating sitemap", { status: 500 })
  }
}
