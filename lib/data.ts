import { Tool } from "@/lib/types"
import { getSheetData } from './sheets'
import type { AITool, API, OpenSoftware, OpenPattern, LLMModel } from './types'
import {
  transformAITool,
  transformAPI,
  transformOpenSoftware,
  transformOpenPattern,
  transformLLMModel,
} from './transform'

// Cache for fetched data
let cachedTools: Tool[] | null = null

/**
 * Fetches all tools from Google Sheets
 */
export async function getAllTools(): Promise<Tool[]> {
  if (cachedTools) {
    return cachedTools
  }

  try {
    // Fetch data from all sheets in parallel
    const [aiTools, apis, openSoftware, openPatterns, llmModels] = await Promise.all([
      getSheetData<AITool>('ai_tools'),
      getSheetData<API>('apis'),
      getSheetData<OpenSoftware>('open_software'),
      getSheetData<OpenPattern>('open_patterns'),
      getSheetData<LLMModel>('llm_models'),
    ])

    // Transform and combine all data
    const tools: Tool[] = [
      ...aiTools.map(transformAITool),
      ...apis.map(transformAPI),
      ...openSoftware.map(transformOpenSoftware),
      ...openPatterns.map(transformOpenPattern),
      ...llmModels.map(transformLLMModel),
      // Local Tools Injection
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
        isFree: true
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
        isFree: true
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
        isFree: true
      }
    ]

    cachedTools = tools
    return tools
  } catch (error) {
    console.error('Error fetching tools from Google Sheets:', error)
    // Return empty array as fallback
    return []
  }
}

/**
 * Gets tools by type
 */
export async function getToolsByType(type: Tool["type"]): Promise<Tool[]> {
  const tools = await getAllTools()
  return tools.filter((tool) => tool.type === type)
}

/**
 * Gets a single tool by slug
 */
export async function getToolBySlug(slug: string): Promise<Tool | undefined> {
  const tools = await getAllTools()
  return tools.find((tool) => tool.slug === slug)
}

/**
 * Searches tools by query
 */
export async function searchTools(query: string, type?: Tool["type"]): Promise<Tool[]> {
  const tools = await getAllTools()
  const lowercaseQuery = query.toLowerCase()

  return tools.filter((tool) => {
    const matchesQuery =
      tool.name.toLowerCase().includes(lowercaseQuery) ||
      tool.description.toLowerCase().includes(lowercaseQuery) ||
      tool.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery))
    const matchesType = type ? tool.type === type : true
    return matchesQuery && matchesType
  })
}

/**
 * Gets featured tools
 */
export async function getFeaturedTools(limit?: number): Promise<Tool[]> {
  const tools = await getAllTools()
  const featured = tools.filter((tool) => tool.featured)
  return limit ? featured.slice(0, limit) : featured
}

/**
 * Gets tools by category
 */
export async function getToolsByCategory(category: string): Promise<Tool[]> {
  const tools = await getAllTools()
  return tools.filter((tool) => tool.category.toLowerCase() === category.toLowerCase())
}

/**
 * Gets related tools based on category
 */
export async function getRelatedTools(currentTool: Tool, limit: number = 3): Promise<Tool[]> {
  const tools = await getAllTools()
  return tools
    .filter((tool) => tool.category === currentTool.category && tool.id !== currentTool.id)
    .slice(0, limit)
}

// Legacy exports for backward compatibility
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
