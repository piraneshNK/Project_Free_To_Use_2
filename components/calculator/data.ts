import {
    Share2, MessageSquare, Search, Code, Brain, Zap,
    PenTool, Image, Video, Music, Mic, Briefcase,
    Layout, Terminal, Bot
} from "lucide-react"

export type Subscription = {
    id: string
    name: string
    price: number
    icon: any
    features: string[]
    category: "reasoning" | "search" | "coding" | "hybrid" | "writing" | "image" | "video" | "audio" | "productivity"
}

export const SUBSCRIPTIONS: Subscription[] = [
    // --- TIER 1: The Giants (Popular) ---
    {
        id: "chatgpt",
        name: "ChatGPT Plus (GPT-5.2)",
        price: 20,
        icon: MessageSquare,
        features: ["Reasoning", "Coding", "Image Gen"],
        category: "hybrid",
    },
    {
        id: "claude",
        name: "Claude Pro (Claude 4.5)",
        price: 20,
        icon: Brain,
        features: ["Reasoning", "Coding", "Long Context"],
        category: "reasoning",
    },
    {
        id: "gemini",
        name: "Gemini Advanced",
        price: 20,
        icon: Zap,
        features: ["Reasoning", "Multimodal", "Google Integration"],
        category: "hybrid",
    },
    {
        id: "perplexity",
        name: "Perplexity Pro",
        price: 20,
        icon: Search,
        features: ["Search", "Research", "Citations"],
        category: "search",
    },
    {
        id: "grok",
        name: "Grok 4 (Premium+)",
        price: 16,
        icon: Share2,
        features: ["Real-time X Data", "Uncensored", "Reasoning"],
        category: "hybrid",
    },
    {
        id: "copilot",
        name: "GitHub Copilot",
        price: 10,
        icon: Code,
        features: ["Coding", "IDE Integration", "Chat"],
        category: "coding",
    },
    {
        id: "midjourney",
        name: "Midjourney",
        price: 30,
        icon: Image,
        features: ["Image Gen", "Art", "Discord"],
        category: "image",
    },

    // --- TIER 2: Coding & Development ---
    {
        id: "cursor",
        name: "Cursor Pro",
        price: 20,
        icon: Terminal,
        features: ["AI Code Editor", "Codebase Chat"],
        category: "coding",
    },
    {
        id: "tabnine",
        name: "Tabnine Pro",
        price: 12,
        icon: Code,
        features: ["Code Completion", "Privacy Focused"],
        category: "coding",
    },
    {
        id: "repl-it",
        name: "Replit Core",
        price: 20,
        icon: Terminal,
        features: ["Cloud IDE", "AI Agent"],
        category: "coding",
    },
    {
        id: "amazon-q",
        name: "Amazon Q Developer",
        price: 19,
        icon: Code,
        features: ["AWS Expert", "Coding"],
        category: "coding",
    },

    // --- TIER 3: Writing & Content ---
    {
        id: "jasper",
        name: "Jasper",
        price: 39,
        icon: PenTool,
        features: ["Marketing", "Copywriting", "SEO"],
        category: "writing",
    },
    {
        id: "copyai",
        name: "Copy.ai",
        price: 36,
        icon: PenTool,
        features: ["Copywriting", "Workflows", "Marketing"],
        category: "writing",
    },
    {
        id: "grammarly",
        name: "Grammarly Premium",
        price: 12,
        icon: PenTool,
        features: ["Grammar", "Tone", "Rewriting"],
        category: "writing",
    },
    {
        id: "writesonic",
        name: "Writesonic",
        price: 19,
        icon: PenTool,
        features: ["SEO Writing", "Article Gen"],
        category: "writing",
    },
    {
        id: "rytr",
        name: "Rytr",
        price: 9,
        icon: PenTool,
        features: ["Short-form Copy", "Budget Friendly"],
        category: "writing",
    },
    {
        id: "sudowrite",
        name: "Sudowrite",
        price: 19,
        icon: PenTool,
        features: ["Fiction Writing", "Novel Helper"],
        category: "writing",
    },
    {
        id: "quillbot",
        name: "QuillBot Premium",
        price: 10,
        icon: PenTool,
        features: ["Paraphrasing", "Plagiarism Check"],
        category: "writing",
    },

    // --- TIER 4: Image & Design ---
    {
        id: "adobe-firefly",
        name: "Adobe Firefly",
        price: 5,
        icon: Image,
        features: ["Image Gen", "Commercial Safe"],
        category: "image",
    },
    {
        id: "leonardo",
        name: "Leonardo.ai",
        price: 12,
        icon: Image,
        features: ["Game Assets", "Fine-tuning"],
        category: "image",
    },
    {
        id: "canva-pro",
        name: "Canva Pro (Magic)",
        price: 15,
        icon: Layout,
        features: ["Design", "AI Tools", "Templates"],
        category: "image",
    },
    {
        id: "freepik",
        name: "Freepik Premium",
        price: 12,
        icon: Image,
        features: ["Vectors", "AI Image Gen"],
        category: "image",
    },
    {
        id: "magnific",
        name: "Magnific AI",
        price: 39,
        icon: Image,
        features: ["Upscaling", "Detail Enhancement"],
        category: "image",
    },

    // --- TIER 5: Video & Animation ---
    {
        id: "runway",
        name: "Runway",
        price: 15,
        icon: Video,
        features: ["Video Gen", "Green Screen"],
        category: "video",
    },
    {
        id: "pika",
        name: "Pika Art",
        price: 10,
        icon: Video,
        features: ["Video Animation", "Lip Sync"],
        category: "video",
    },
    {
        id: "elevenlabs",
        name: "ElevenLabs",
        price: 22,
        icon: Mic,
        features: ["Voice Cloning", "TTS"],
        category: "audio",
    },
    {
        id: "suno",
        name: "Suno",
        price: 10,
        icon: Music,
        features: ["Music Gen", "Songwriting"],
        category: "audio",
    },
    {
        id: "udio",
        name: "Udio",
        price: 10,
        icon: Music,
        features: ["Music Gen", "High Fidelity"],
        category: "audio",
    },
    {
        id: "descript",
        name: "Descript",
        price: 15,
        icon: Mic,
        features: ["Audio Edit", "Transcription"],
        category: "audio",
    },

    // --- TIER 6: Productivity & Other ---
    {
        id: "notion-ai",
        name: "Notion AI",
        price: 10,
        icon: Briefcase,
        features: ["Notes", "Docs", "Summaries"],
        category: "productivity",
    },
    {
        id: "otter",
        name: "Otter.ai",
        price: 17,
        icon: Mic,
        features: ["Meeting Notes", "Transcription"],
        category: "productivity",
    },
    {
        id: "fireflies",
        name: "Fireflies.ai",
        price: 18,
        icon: Mic,
        features: ["Meeting Assistant", "Summary"],
        category: "productivity",
    },
    {
        id: "beautiful-ai",
        name: "Beautiful.ai",
        price: 12,
        icon: Layout,
        features: ["Presentation Gen", "Slides"],
        category: "productivity",
    },
    {
        id: "gamma",
        name: "Gamma",
        price: 10,
        icon: Layout,
        features: ["Presentation Gen", "Webpages"],
        category: "productivity",
    },
    {
        id: "zapier",
        name: "Zapier AI",
        price: 29,
        icon: Zap,
        features: ["Automation", "Workflows"],
        category: "productivity",
    },
    {
        id: "poe",
        name: "Poe Subscription",
        price: 20,
        icon: Bot,
        features: ["Model Aggregator", "Chat"],
        category: "hybrid",
    },
]

// Estimated 2026 Rates
export const EXCHANGE_RATES = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.78,
    INR: 86.50,
    JPY: 145.2,
    CAD: 1.38,
    AUD: 1.55,
    BRL: 5.15,
} as const

export type Currency = keyof typeof EXCHANGE_RATES
