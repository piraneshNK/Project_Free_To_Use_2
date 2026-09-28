import { NextResponse } from 'next/server'
import { getAllTools } from '@/lib/data'
import { slugify } from '@/lib/transform'

const BASE_URL = 'https://projectfreetouse.com'

export const revalidate = 300

export async function GET() {
    try {
        const tools = await getAllTools()
        const now = new Date().toISOString()

        // Static pages
        const staticPages = [
            '',
            '/ai-tools',
            '/apis',
            '/open-source',
            '/open-patents',
            '/llm-models',
            '/ai-overlap-burn-calculator',
            '/age-calculator',
            '/percentage-calculator',
            '/about',
            '/blog',
            '/submit',
        ]

        const staticUrls = staticPages.map(page => ({
            url: `${BASE_URL}${page}`,
            lastModified: now,
            changeFrequency: 'daily',
            priority: page === '' ? '1.0' : '0.8',
        }))

        // Dynamic tool pages
        const toolUrls = tools.map((tool) => ({
            url: `${BASE_URL}/tool/${tool.slug || slugify(tool.name)}`,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: '0.9',
        }))

        const allUrls = [...staticUrls, ...toolUrls]

        // Generate XML with stylesheet reference
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allUrls
                .map(
                    (url) => `
  <url>
    <loc>${url.url}</loc>
    <lastmod>${url.lastModified}</lastmod>
    <changefreq>${url.changeFrequency}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
                )
                .join('')}
</urlset>`

        return new NextResponse(xml, {
            headers: {
                'Content-Type': 'application/xml',
                'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
            },
        })
    } catch (error) {
        console.error('Error generating sitemap:', error)
        return new NextResponse('Error generating sitemap', { status: 500 })
    }
}
