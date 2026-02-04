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
        id: aiTool.id,
        slug: slugify(aiTool.name),
        name: aiTool.name,
        description: aiTool.description,
        category: aiTool.category,
        type: 'app',
        tags: parseTags(aiTool.tags),
        url: aiTool.website,
        logoUrl: getFaviconUrl(aiTool.website),
        isFree: true,
        github: aiTool.github || undefined,
        featured: parseBoolean(aiTool.featured),
        verified: parseBoolean(aiTool.verified),
    }
}

/**
 * Transforms API data from Google Sheets to Tool format
 */
export function transformAPI(api: API): Tool {
    return {
        id: api.id,
        slug: slugify(api.name),
        name: api.name,
        description: api.description,
        category: api.api_type,
        type: 'api',
        tags: [api.api_type, api.provider].filter(Boolean),
        url: api.website,
        logoUrl: getFaviconUrl(api.website),
        isFree: parseBoolean(api.free_tier),
        endpoint: api.docs || undefined,
        featured: parseBoolean(api.featured),
        verified: parseBoolean(api.verified),
    }
}

/**
 * Transforms Open Software data from Google Sheets to Tool format
 */
export function transformOpenSoftware(software: OpenSoftware): Tool {
    return {
        id: software.id,
        slug: slugify(software.name),
        name: software.name,
        description: software.description,
        category: software.category,
        type: 'open-source',
        tags: [software.category, software.os, software.license].filter(Boolean),
        url: software.website,
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
        id: pattern.id,
        slug: slugify(pattern.name),
        name: pattern.name,
        description: pattern.description,
        category: pattern.pattern_type,
        type: 'patent',
        tags: parseTags(pattern.tags),
        url: pattern.source,
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
    const url = model.huggingface || model.github
    return {
        id: model.id,
        slug: slugify(model.name),
        name: model.name,
        description: model.description,
        category: model.model_type,
        type: 'app',
        tags: [model.model_type, model.provider, model.license].filter(Boolean),
        url: url,
        logoUrl: getFaviconUrl(url),
        isFree: true,
        github: model.github || undefined,
        license: model.license || undefined,
        featured: parseBoolean(model.featured),
        verified: parseBoolean(model.verified),
    }
}
