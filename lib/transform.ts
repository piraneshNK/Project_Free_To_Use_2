// Data transformation utilities for Google Sheets data

import type { AITool, API, OpenSoftware, OpenPattern, LLMModel, Tool } from './types'
import { getFaviconUrl } from './favicon'

/**
 * Converts a string to a URL-friendly slug
 */
export function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()
}

/**
 * Parses a comma-separated tags string into an array
 */
export function parseTags(tagsString: string): string[] {
    if (!tagsString) return []
    return tagsString.split(',').map(tag => tag.trim()).filter(Boolean)
}

/**
 * Converts string boolean to actual boolean
 */
export function parseBoolean(value: string): boolean {
    return value?.toUpperCase() === 'TRUE'
}

/**
 * Transforms AI Tool data from Google Sheets to Tool format
 */
export function transformAITool(aiTool: AITool): Tool {
    return {
        id: aiTool.id || 'missing-id',
        slug: slugify(aiTool.name || 'unnamed-tool'),
        name: aiTool.name || 'Unnamed Tool',
        description: aiTool.description || '',
        category: aiTool.category || 'Uncategorized',
        type: 'app',
        tags: parseTags(aiTool.tags),
        url: aiTool.website || '#',
        logoUrl: getFaviconUrl(aiTool.website),
        isFree: true,
        github: aiTool.github || undefined,
        pricing: aiTool.pricing_note || undefined,
        featured: parseBoolean(aiTool.featured),
        verified: parseBoolean(aiTool.verified),
    }
}

/**
 * Transforms API data from Google Sheets to Tool format
 */
export function transformAPI(api: API): Tool {
    return {
        id: api.id || 'missing-id',
        slug: slugify(api.name || 'unnamed-api'),
        name: api.name || 'Unnamed API',
        description: api.description || '',
        category: api.api_type || 'Uncategorized',
        type: 'api',
        tags: [api.api_type, api.provider].filter(Boolean) as string[],
        url: api.website || '#',
        logoUrl: getFaviconUrl(api.website),
        isFree: parseBoolean(api.free_tier),
        endpoint: api.docs || undefined,
        pricing: api.pricing_note || undefined,
        featured: parseBoolean(api.featured),
        verified: parseBoolean(api.verified),
    }
}

/**
 * Transforms Open Software data from Google Sheets to Tool format
 */
export function transformOpenSoftware(software: OpenSoftware): Tool {
    return {
        id: software.id || 'missing-id',
        slug: slugify(software.name || 'unnamed-software'),
        name: software.name || 'Unnamed Software',
        description: software.description || '',
        category: software.category || 'Uncategorized',
        type: 'open-source',
        tags: [software.category, software.os, software.license].filter(Boolean) as string[],
        url: software.website || '#',
        logoUrl: getFaviconUrl(software.website),
        isFree: true,
        github: software.github || undefined,
        license: software.license || undefined,
        featured: parseBoolean(software.featured),
        verified: parseBoolean(software.verified),
    }
}

/**
 * Transforms Open Pattern data from Google Sheets to Tool format
 */
export function transformOpenPattern(pattern: OpenPattern): Tool {
    return {
        id: pattern.id || 'missing-id',
        slug: slugify(pattern.name || 'unnamed-pattern'),
        name: pattern.name || 'Unnamed Pattern',
        description: pattern.description || '',
        category: pattern.pattern_type || 'Uncategorized',
        type: 'patent',
        tags: parseTags(pattern.tags),
        url: pattern.source || '#',
        logoUrl: getFaviconUrl(pattern.source),
        isFree: true,
        featured: parseBoolean(pattern.featured),
        verified: parseBoolean(pattern.verified),
    }
}

/**
 * Transforms LLM Model data from Google Sheets to Tool format
 */
export function transformLLMModel(model: LLMModel): Tool {
    const url = model.huggingface || model.github || '#'
    return {
        id: model.id || 'missing-id',
        slug: slugify(model.name || 'unnamed-model'),
        name: model.name || 'Unnamed Model',
        description: model.description || '',
        category: model.model_type || 'Uncategorized',
        type: 'app',
        tags: [model.model_type, model.provider, model.license].filter(Boolean) as string[],
        url: url,
        logoUrl: getFaviconUrl(url),
        isFree: true,
        github: model.github || undefined,
        license: model.license || undefined,
        featured: parseBoolean(model.featured),
        verified: parseBoolean(model.verified),
    }
}
