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
    pricing?: string
}

