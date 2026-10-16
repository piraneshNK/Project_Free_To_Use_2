import { getDirectoryData } from "@/lib/data"
import {
  DIRECTORY_PAGE_SIZE,
  SITE_URL,
  directories,
  filterDirectoryTools,
  getDirectoryUrl,
} from "@/lib/directory-config"
import { slugify } from "@/lib/transform"

export const SITEMAP_URL_LIMIT = 5000

export interface SitemapEntry {
  url: string
  lastModified: string
  changeFrequency: "daily" | "weekly"
  priority: string
}

export async function getSitemapEntries(): Promise<SitemapEntry[]> {
  const { tools, directoryTools } = await getDirectoryData()
  const now = new Date().toISOString()
  const entries: SitemapEntry[] = []
  const addUrl = (url: string, changeFrequency: SitemapEntry["changeFrequency"], priority: string) => {
    entries.push({ url: `${SITE_URL}${url}`, lastModified: now, changeFrequency, priority })
  }

  const staticPages = [
    "",
    "/free-tools",
    "/ai-overlap-burn-calculator",
    "/age-calculator",
    "/percentage-calculator",
    "/about",
    "/blog",
    "/submit",
  ]
  for (const page of staticPages) addUrl(page, "daily", page === "" ? "1.0" : "0.8")

  for (const directory of directories) {
    const listingTools = directoryTools[directory.id]

    addUrl(directory.path, "daily", "0.8")
    const listingPageCount = Math.ceil(listingTools.length / DIRECTORY_PAGE_SIZE)
    for (let page = 2; page <= listingPageCount; page += 1) {
      addUrl(getDirectoryUrl(directory, page), "daily", "0.7")
    }

    for (const category of directory.categories) {
      const categoryTools = filterDirectoryTools(listingTools, directory, category.id)
      addUrl(getDirectoryUrl(directory, 1, category.id), "daily", "0.7")
      const categoryPageCount = Math.ceil(categoryTools.length / DIRECTORY_PAGE_SIZE)
      for (let page = 2; page <= categoryPageCount; page += 1) {
        addUrl(getDirectoryUrl(directory, page, category.id), "daily", "0.6")
      }
    }
  }

  const toolUrls = new Set(tools.map((tool) => `/tool/${tool.slug || slugify(tool.name)}`))
  for (const path of toolUrls) addUrl(path, "weekly", "0.9")

  return entries
}

export function renderUrlSet(entries: SitemapEntry[]): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map((entry) => `  <url>
    <loc>${escapeXml(entry.url)}</loc>
    <lastmod>${entry.lastModified}</lastmod>
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join("\n")}
</urlset>`
}

export function renderSitemapIndex(count: number): string {
  const sitemapCount = Math.ceil(count / SITEMAP_URL_LIMIT)
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Array.from({ length: sitemapCount }, (_, index) => `  <sitemap>
    <loc>${SITE_URL}/sitemaps/${index}.xml</loc>
  </sitemap>`).join("\n")}
</sitemapindex>`
}

function escapeXml(value: string): string {
  return value.replace(/[<>&"']/g, (character) => ({
    "<": "&lt;",
    ">": "&gt;",
    "&": "&amp;",
    '"': "&quot;",
    "'": "&apos;",
  })[character] ?? character)
}
