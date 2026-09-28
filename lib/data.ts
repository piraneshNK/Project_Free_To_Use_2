import { createClient as createSupabaseClient } from "@supabase/supabase-js"
import type { Tool } from "@/lib/types"
import { slugify } from "./transform"
import { getFaviconUrl } from "./favicon"

const PAGE_SIZE = 1000
const CACHE_TTL_MS = 5 * 60 * 1000
const TABLE_COLUMNS: Record<DirectoryTable, string> = {
  ai_tools: "id,name,slug,website,description,category",
  apis: "id,name,slug,description,auth,https,cors,website,category",
  llm_models: "id,name,slug,model_id,provider,description,website",
  open_products: "id,name,pattern_type,description,use_case,difficulty,source,tags",
  software: "id,name,slug,website,description,category,logo_url,favicon_url",
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
const supabase = supabaseUrl && supabaseKey
  ? createSupabaseClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    })
  : null

const localTools: Tool[] = [
  {
    id: "ai-overlap-burn-calculator",
    name: "AI Overlap & Burn Calculator",
    description: "Calculate your AI subscription costs and find redundant tools in your stack.",
    url: "/ai-overlap-burn-calculator",
    slug: "ai-overlap-burn-calculator",
    category: "Productivity AI",
    type: "app",
    tags: ["finance", "subscription", "calculator", "cost"],
    pricing: "Free",
    featured: true,
    verified: true,
    isFree: true,
  },
  {
    id: "age-calculator",
    name: "Age Calculator",
    description: "Calculate your exact age in years, months, and days with next birthday countdown.",
    url: "/age-calculator",
    slug: "age-calculator",
    category: "Productivity AI",
    type: "app",
    tags: ["calculator", "age", "utility", "date"],
    pricing: "Free",
    featured: true,
    verified: true,
    isFree: true,
  },
  {
    id: "percentage-calculator",
    name: "Percentage Calculator",
    description: "All-in-one percentage calculator with 5 calculation modes. Calculate percentages, differences, and changes instantly.",
    url: "/percentage-calculator",
    slug: "percentage-calculator",
    category: "Productivity AI",
    type: "app",
    tags: ["calculator", "percentage", "math", "utility"],
    pricing: "Free",
    featured: true,
    verified: true,
    isFree: true,
  },
]

type DirectoryTable = "ai_tools" | "apis" | "llm_models" | "open_products" | "software"
export type DirectoryCounts = {
  apps: number
  apis: number
  openSource: number
  patents: number
}

type DirectoryData = {
  tools: Tool[]
  counts: DirectoryCounts
}

type TableData = Awaited<ReturnType<typeof readTable>>
const tableCache = new Map<DirectoryTable, { expiresAt: number; promise: Promise<TableData> }>()
let directoryCache: { expiresAt: number; promise: Promise<DirectoryData> } | null = null

function valueFrom(row: Record<string, unknown>, ...keys: string[]): string {
  for (const key of keys) {
    const value = row[key]
    if (typeof value === "string" && value.trim()) return value.trim()
    if (typeof value === "number" || typeof value === "boolean") return String(value)
  }
  return ""
}

function tagsFrom(value: string): string[] {
  return value.split(/[,;|]/).map((tag) => tag.trim()).filter(Boolean)
}

function booleanFrom(value: string, fallback = false): boolean {
  if (!value) return fallback
  return ["true", "1", "yes", "free"].includes(value.toLowerCase())
}

function mapRow(row: Record<string, unknown>, table: DirectoryTable): Tool | null {
  const name = valueFrom(row, "name", "title", "tool_name", "product_name", "model_name")
  if (!name) return null

  const slug = valueFrom(row, "slug") || slugify(name)
  const id = valueFrom(row, "id", "uuid", "tool_id") || slug
  const category = valueFrom(row, "category", "api_type", "model_type", "product_type", "pattern_type", "type")
    || (table === "llm_models" ? "LLM Models" : "Uncategorized")
  const description = valueFrom(row, "description", "summary", "overview")
  const github = valueFrom(row, "github", "github_url", "repository", "repository_url")
  const docs = valueFrom(row, "docs", "docs_url", "documentation", "documentation_url", "endpoint")
  const website = valueFrom(row, "website", "website_url", "url", "link", "homepage", "source")
  const url = table === "llm_models"
    ? valueFrom(row, "huggingface", "huggingface_url") || github || website || docs || "#"
    : website || docs || github || "#"
  const storedLogo = valueFrom(row, "logo_url", "favicon_url", "logo", "image_url", "image")
  const tags = tagsFrom(valueFrom(row, "tags", "keywords", "tag"))
  if (category !== "Uncategorized" && !tags.includes(category)) tags.push(category)
  for (const tag of [valueFrom(row, "provider"), valueFrom(row, "auth"), valueFrom(row, "https"), valueFrom(row, "cors")]) {
    if (tag && !tags.includes(tag)) tags.push(tag)
  }
  if (table === "llm_models" && !tags.some((tag) => /llm|language model|embedding|text generation/i.test(tag))) {
    tags.push("LLM")
  }

  const type: Tool["type"] = table === "apis"
    ? "api"
    : table === "software"
      ? "open-source"
      : table === "open_products"
        ? "patent"
        : "app"

  return {
    id,
    slug,
    name,
    description,
    category,
    type,
    tags,
    url,
    logoUrl: storedLogo || getFaviconUrl(website || url),
    isFree: booleanFrom(valueFrom(row, "is_free", "free", "free_tier"), true),
    endpoint: type === "api" ? docs || undefined : undefined,
    license: valueFrom(row, "license", "license_name") || undefined,
    github: github || undefined,
    featured: booleanFrom(valueFrom(row, "featured")),
    verified: booleanFrom(valueFrom(row, "verified")),
    sponsored: booleanFrom(valueFrom(row, "sponsored")),
    pricing: valueFrom(row, "pricing", "pricing_note", "price") || undefined,
  }
}

async function readTable(table: DirectoryTable) {
  if (!supabase) throw new Error("Supabase environment variables are not configured")
  const rows: Record<string, unknown>[] = []
  let count = 0

  for (let start = 0; ; start += PAGE_SIZE) {
    const { data, count: exactCount, error } = await supabase
      .from(table)
      .select(TABLE_COLUMNS[table], { count: "exact" })
      .order("id", { ascending: true })
      .range(start, start + PAGE_SIZE - 1)

    if (error) throw new Error(`Unable to read ${table}: ${error.message}`)

    const page = (data ?? []) as unknown as Record<string, unknown>[]
    rows.push(...page)
    count = exactCount ?? rows.length
    if (page.length < PAGE_SIZE || rows.length >= count) break
  }

  return { rows, count }
}

function getTableData(table: DirectoryTable): Promise<TableData> {
  if (!supabase) return Promise.resolve({ rows: [], count: 0 })

  const cached = tableCache.get(table)
  if (cached && cached.expiresAt > Date.now()) return cached.promise

  const promise = readTable(table).catch((error) => {
    tableCache.delete(table)
    throw error
  })
  tableCache.set(table, { expiresAt: Date.now() + CACHE_TTL_MS, promise })
  return promise
}

async function loadDirectoryData(): Promise<DirectoryData> {
  const tables: DirectoryTable[] = ["ai_tools", "apis", "llm_models", "open_products", "software"]
  const results = await Promise.all(tables.map(async (table) => {
    try {
      return [table, await getTableData(table)] as const
    } catch (error) {
      console.error(`Error loading Supabase table ${table}:`, error)
      return [table, { rows: [], count: 0 }] as const
    }
  }))
  const tableData = Object.fromEntries(results) as Record<DirectoryTable, Awaited<ReturnType<typeof readTable>>>

  const tools = tables.flatMap((table) => tableData[table].rows
    .map((row) => mapRow(row, table))
    .filter((tool): tool is Tool => tool !== null))

  return {
    tools: [...tools, ...localTools],
    counts: {
      apps: tableData.ai_tools.count,
      apis: tableData.apis.count,
      openSource: tableData.software.count,
      patents: tableData.open_products.count,
    },
  }
}

export function getDirectoryData(): Promise<DirectoryData> {
  if (directoryCache && directoryCache.expiresAt > Date.now()) return directoryCache.promise

  const promise = loadDirectoryData().catch((error) => {
    directoryCache = null
    throw error
  })
  directoryCache = { expiresAt: Date.now() + CACHE_TTL_MS, promise }
  return promise
}

export async function getToolsForDirectory(
  directory: "app" | "api" | "open-source" | "patent" | "llm",
  offset = 0,
  limit?: number,
): Promise<Tool[]> {
  const table: DirectoryTable = directory === "api"
    ? "apis"
    : directory === "open-source"
      ? "software"
      : directory === "patent"
        ? "open_products"
        : directory === "llm"
          ? "llm_models"
          : "ai_tools"

  const { rows } = await getTableData(table)
  const tools = rows
    .map((row) => mapRow(row, table))
    .filter((tool): tool is Tool => tool !== null)

  if (directory === "app") {
    return [...tools, ...localTools].filter((tool) =>
      !["ai-overlap-burn-calculator", "age-calculator", "percentage-calculator"].includes(tool.id)
    )
  }

  return limit === undefined ? tools.slice(offset) : tools.slice(offset, offset + limit)
}

export async function getAllTools(): Promise<Tool[]> {
  return (await getDirectoryData()).tools
}

export async function getToolsByType(type: Tool["type"]): Promise<Tool[]> {
  return (await getAllTools()).filter((tool) => tool.type === type)
}

export async function getToolBySlug(slug: string): Promise<Tool | undefined> {
  return (await getAllTools()).find((tool) => tool.slug === slug)
}

export async function searchTools(query: string, type?: Tool["type"]): Promise<Tool[]> {
  const lowercaseQuery = query.toLowerCase()
  return (await getAllTools()).filter((tool) => {
    const matchesQuery = tool.name.toLowerCase().includes(lowercaseQuery)
      || tool.description.toLowerCase().includes(lowercaseQuery)
      || tool.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery))
    return matchesQuery && (type ? tool.type === type : true)
  })
}

export async function getFeaturedTools(limit?: number): Promise<Tool[]> {
  const featured = (await getAllTools()).filter((tool) => tool.featured)
  return limit ? featured.slice(0, limit) : featured
}

export async function getToolsByCategory(category: string): Promise<Tool[]> {
  return (await getAllTools()).filter((tool) => tool.category.toLowerCase() === category.toLowerCase())
}

export async function getRelatedTools(currentTool: Tool, limit = 3): Promise<Tool[]> {
  return (await getAllTools())
    .filter((tool) => tool.category === currentTool.category && tool.id !== currentTool.id)
    .slice(0, limit)
}

export const categories = [
  { id: "writing", label: "Writing AI", icon: "pen" },
  { id: "image", label: "Image AI", icon: "image" },
  { id: "video", label: "Video AI", icon: "video" },
  { id: "productivity", label: "Productivity AI", icon: "briefcase" },
  { id: "coding", label: "Coding AI", icon: "code" },
  { id: "student", label: "Student AI", icon: "book" },
]

export const apiCategories = [
  { id: "ai", label: "AI APIs" },
  { id: "weather", label: "Weather APIs" },
  { id: "finance", label: "Finance APIs" },
  { id: "developer", label: "Developer APIs" },
]