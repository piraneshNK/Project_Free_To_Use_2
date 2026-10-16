import Link from "next/link"
import { notFound } from "next/navigation"
import { Brain, Code, GitBranch, Lightbulb, Search } from "lucide-react"
import { FAQSection } from "@/components/faq-section"
import { BreadcrumbSchema, ItemListSchema } from "@/components/json-ld"
import { ToolCard } from "@/components/tool-card"
import {
  DIRECTORY_PAGE_SIZE,
  SITE_URL,
  type DirectoryConfig,
  getDirectoryCategoryHeading,
  getDirectoryUrl,
} from "@/lib/directory-config"
import type { Tool } from "@/lib/types"

interface DirectoryListingProps {
  directory: DirectoryConfig
  tools: Tool[]
  page: number
  categoryId?: string
}

const directoryIcons = {
  brain: Brain,
  code: Code,
  "git-branch": GitBranch,
  lightbulb: Lightbulb,
}

export function DirectoryListing({
  directory,
  tools,
  page,
  categoryId,
}: DirectoryListingProps) {
  const category = directory.categories.find((item) => item.id === categoryId)
  if (categoryId && !category) notFound()

  const total = tools.length
  const pageCount = Math.ceil(total / DIRECTORY_PAGE_SIZE)
  if (page > Math.max(pageCount, 1)) notFound()

  const pageTools = tools.slice((page - 1) * DIRECTORY_PAGE_SIZE, page * DIRECTORY_PAGE_SIZE)
  const firstItem = total === 0 ? 0 : (page - 1) * DIRECTORY_PAGE_SIZE + 1
  const lastItem = Math.min(page * DIRECTORY_PAGE_SIZE, total)
  const Icon = directoryIcons[directory.icon]
  const currentUrl = `${SITE_URL}${getDirectoryUrl(directory, page, categoryId)}`
  const previousUrl = page > 1 ? getDirectoryUrl(directory, page - 1, categoryId) : undefined
  const nextUrl = page < pageCount ? getDirectoryUrl(directory, page + 1, categoryId) : undefined
  const breadcrumbItems = [
    { name: "Home", url: SITE_URL },
    { name: directory.name, url: `${SITE_URL}${directory.path}` },
    ...(category ? [{ name: category.label, url: `${SITE_URL}${directory.path}/category/${category.id}` }] : []),
    ...(page > 1 ? [{ name: `Page ${page}`, url: currentUrl }] : []),
  ]

  return (
    <div className="pt-16">
      {previousUrl && <link rel="prev" href={`${SITE_URL}${previousUrl}`} />}
      {nextUrl && <link rel="next" href={`${SITE_URL}${nextUrl}`} />}
      <BreadcrumbSchema items={breadcrumbItems} />
      <ItemListSchema
        name={`${category ? `${category.label} ` : ""}${directory.name} Directory`}
        description={directory.itemListDescription}
        items={pageTools.map((tool) => ({
          name: tool.name,
          url: `${SITE_URL}/tool/${tool.slug}`,
          description: tool.description,
        }))}
      />

      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <div className="mb-8">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
              {category ? getDirectoryCategoryHeading(directory, category.label) : directory.heading}
              </h1>
              <p className="text-muted-foreground">{directory.description}</p>
            </div>
          </div>
        </div>

        <section className="mb-8 rounded-2xl border border-border bg-card/50 p-6 lg:p-8">
          <h2 className="mb-4 text-xl font-semibold text-foreground">
            {category ? `Explore ${category.label}` : directory.introHeading}
          </h2>
          <div className="space-y-4 leading-relaxed text-muted-foreground">
            {directory.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </section>

        {directory.stats && (
          <div className="mb-8 grid grid-cols-3 gap-4">
            {directory.stats.map((stat) => (
              <div key={stat.label} className="rounded-xl border border-border bg-card p-4 text-center">
                <p className="text-2xl font-bold text-primary">{stat.count}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        )}

        {directory.id === "api" && (
          <div className="mb-8 rounded-xl border border-primary/20 bg-primary/5 p-4">
            <p className="text-sm text-foreground">
              <strong className="text-primary">Pro tip:</strong> Each API card includes a copy button for the endpoint URL.
              Click to copy and integrate into your projects quickly.
            </p>
          </div>
        )}

        <div className="mb-8 space-y-4">
          <form action="/search" method="get" className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              name="q"
              placeholder={`Search ${directory.name.toLowerCase()}...`}
              className="h-12 w-full rounded-xl border border-border bg-card pl-12 pr-4"
            />
          </form>
          <nav aria-label={`${directory.name} categories`} className="flex flex-wrap items-center gap-2">
            <Link
              href={directory.path}
              aria-current={!categoryId ? "page" : undefined}
              className={`rounded-full px-3 py-1 text-sm transition-colors ${!categoryId ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}
            >
              All
            </Link>
            {directory.categories.map((item) => (
              <Link
                key={item.id}
                href={`${directory.path}/category/${item.id}`}
                aria-current={categoryId === item.id ? "page" : undefined}
                className={`rounded-full px-3 py-1 text-sm transition-colors ${categoryId === item.id ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <p className="mb-6 text-sm text-muted-foreground">
          Showing {firstItem}-{lastItem} of {total} {total === 1 ? directory.singular : directory.plural}
        </p>

        {pageTools.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {pageTools.map((tool, index) => <ToolCard key={tool.id} tool={tool} index={index} />)}
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="text-lg text-muted-foreground">
              No {directory.plural} found in this category.
            </p>
          </div>
        )}

        {pageCount > 1 && (
          <nav aria-label="Pagination" className="mt-8 flex items-center justify-between">
            {previousUrl ? (
              <Link rel="prev" href={previousUrl} className="rounded-md border border-border px-5 py-2 text-sm font-medium hover:bg-muted">
                Previous
              </Link>
            ) : <span />}
            <span className="text-sm text-muted-foreground">Page {page} of {pageCount}</span>
            {nextUrl ? (
              <Link rel="next" href={nextUrl} className="rounded-md border border-border px-5 py-2 text-sm font-medium hover:bg-muted">
                Next
              </Link>
            ) : <span />}
          </nav>
        )}

        <FAQSection title={directory.faqTitle} faqs={directory.faqs} />
      </div>
    </div>
  )
}
