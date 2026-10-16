import { NextResponse } from "next/server"
import { getSitemapEntries, renderSitemapIndex, renderUrlSet, SITEMAP_URL_LIMIT } from "@/lib/sitemap"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const entries = await getSitemapEntries()
    const xml = entries.length > SITEMAP_URL_LIMIT
      ? renderSitemapIndex(entries.length)
      : renderUrlSet(entries)

    return new NextResponse(xml, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "no-store",
      },
    })
  } catch (error) {
    console.error("Error generating sitemap:", error)
    return new NextResponse("Error generating sitemap", { status: 500 })
  }
}
