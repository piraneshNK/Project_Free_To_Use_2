// Type definitions for Google Sheets data

export interface AITool {
    id: string
    name: string
    category: string
    description: string
    free_type: string
    pricing_note: string
    website: string
    github: string
    tags: string
    featured: string
    sponsored: string
    verified: string
}

export interface API {
    id: string
    name: string
    api_type: string
    description: string
    free_tier: string
    auth: string
    rate_limit: string
    pricing_note: string
    docs: string
    website: string
    provider: string
    featured: string
    sponsored: string
    verified: string
}

export interface OpenSoftware {
    id: string
    name: string
    category: string
    description: string
    os: string
    license: string
    website: string
    github: string
    alternatives: string
    featured: string
    sponsored: string
    verified: string
}

export interface OpenPattern {
    id: string
    name: string
    pattern_type: string
    description: string
    use_case: string
    difficulty: string
    source: string
    tags: string
    featured: string
    verified: string
}

export interface LLMModel {
    id: string
    name: string
    model_type: string
    description: string
    provider: string
    license: string
    parameters: string
    huggingface: string
    github: string
    local_run: string
    featured: string
    verified: string
}

// Unified Tool type for backward compatibility
export interface Tool {
    id: string
    slug: string
    name: string
    description: string
    category: string
    type: 'app' | 'api' | 'open-source' | 'patent'
    tags: string[]
    url: string
    logoUrl?: string
    isFree: boolean
    endpoint?: string
    stars?: number
    license?: string
    github?: string
    featured?: boolean
    verified?: boolean
    sponsored?: boolean
}

