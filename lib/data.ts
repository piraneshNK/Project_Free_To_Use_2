import { Tool } from "@/components/tool-card"

export const sampleTools: Tool[] = [
  // Apps
  {
    id: "1",
    slug: "notion-alternative",
    name: "AnyType",
    description: "A private, local-first alternative to Notion. Open-source personal knowledge base and project management.",
    category: "Productivity",
    type: "app",
    tags: ["Productivity", "Notes", "Open Source"],
    url: "https://anytype.io",
    isFree: true,
  },
  {
    id: "2",
    slug: "figma-free",
    name: "Penpot",
    description: "Open source design and prototyping platform for design and code collaboration.",
    category: "Design",
    type: "app",
    tags: ["Design", "Prototyping", "Collaboration"],
    url: "https://penpot.app",
    isFree: true,
  },
  {
    id: "3",
    slug: "canva-alternative",
    name: "Photopea",
    description: "Free online photo editor supporting PSD, XCF, Sketch, XD and CDR formats.",
    category: "Design",
    type: "app",
    tags: ["Design", "Photo Editor", "Free"],
    url: "https://photopea.com",
    isFree: true,
  },
  {
    id: "4",
    slug: "ai-writing-assistant",
    name: "Quillbot Free",
    description: "AI-powered paraphrasing tool with grammar checker and summarizer features.",
    category: "AI Tools",
    type: "app",
    tags: ["AI", "Writing", "Education"],
    url: "https://quillbot.com",
    isFree: true,
  },
  {
    id: "5",
    slug: "video-editor-free",
    name: "DaVinci Resolve",
    description: "Professional video editing, color correction, visual effects and audio post production.",
    category: "Design",
    type: "app",
    tags: ["Video", "Editing", "Professional"],
    url: "https://blackmagicdesign.com/products/davinciresolve",
    isFree: true,
  },
  {
    id: "6",
    slug: "study-app",
    name: "Anki",
    description: "Powerful flashcard app using spaced repetition for efficient learning and memorization.",
    category: "Education",
    type: "app",
    tags: ["Education", "Study", "Flashcards"],
    url: "https://apps.ankiweb.net",
    isFree: true,
  },
  // APIs
  {
    id: "7",
    slug: "openai-api",
    name: "OpenAI API",
    description: "Access GPT models for text generation, code completion, and natural language processing.",
    category: "AI APIs",
    type: "api",
    tags: ["AI", "GPT", "NLP"],
    url: "https://openai.com/api",
    endpoint: "https://api.openai.com/v1/chat/completions",
    isFree: true,
  },
  {
    id: "8",
    slug: "weather-api",
    name: "OpenWeather API",
    description: "Current weather, forecasts, and historical data for any location worldwide.",
    category: "Weather APIs",
    type: "api",
    tags: ["Weather", "Data", "Free Tier"],
    url: "https://openweathermap.org/api",
    endpoint: "https://api.openweathermap.org/data/2.5/weather",
    isFree: true,
  },
  {
    id: "9",
    slug: "finance-api",
    name: "Alpha Vantage",
    description: "Free APIs for realtime and historical stock, forex, and cryptocurrency data.",
    category: "Finance APIs",
    type: "api",
    tags: ["Finance", "Stocks", "Crypto"],
    url: "https://alphavantage.co",
    endpoint: "https://www.alphavantage.co/query",
    isFree: true,
  },
  {
    id: "10",
    slug: "github-api",
    name: "GitHub REST API",
    description: "Access GitHub data - repositories, users, issues, pull requests and more.",
    category: "Developer APIs",
    type: "api",
    tags: ["GitHub", "Developer", "Git"],
    url: "https://docs.github.com/en/rest",
    endpoint: "https://api.github.com",
    isFree: true,
  },
  // Open Source
  {
    id: "11",
    slug: "nextjs",
    name: "Next.js",
    description: "The React framework for production. Hybrid static & server rendering, TypeScript support.",
    category: "Web Framework",
    type: "open-source",
    tags: ["React", "Framework", "SSR"],
    url: "https://github.com/vercel/next.js",
    stars: 120000,
    license: "MIT",
    isFree: true,
  },
  {
    id: "12",
    slug: "tailwindcss",
    name: "Tailwind CSS",
    description: "A utility-first CSS framework for rapid UI development with pre-defined classes.",
    category: "CSS Framework",
    type: "open-source",
    tags: ["CSS", "Framework", "Styling"],
    url: "https://github.com/tailwindlabs/tailwindcss",
    stars: 78000,
    license: "MIT",
    isFree: true,
  },
  {
    id: "13",
    slug: "supabase",
    name: "Supabase",
    description: "Open source Firebase alternative with PostgreSQL database, auth, and realtime subscriptions.",
    category: "Backend",
    type: "open-source",
    tags: ["Database", "Auth", "Realtime"],
    url: "https://github.com/supabase/supabase",
    stars: 65000,
    license: "Apache-2.0",
    isFree: true,
  },
  {
    id: "14",
    slug: "prisma",
    name: "Prisma",
    description: "Next-generation ORM for Node.js and TypeScript with intuitive data modeling.",
    category: "Database",
    type: "open-source",
    tags: ["ORM", "Database", "TypeScript"],
    url: "https://github.com/prisma/prisma",
    stars: 36000,
    license: "Apache-2.0",
    isFree: true,
  },
  // Open Patents
  {
    id: "15",
    slug: "tesla-patents",
    name: "Tesla Open Patents",
    description: "Tesla's electric vehicle patents made available for good faith use by anyone.",
    category: "Electric Vehicles",
    type: "patent",
    tags: ["EV", "Battery", "Automotive"],
    url: "https://www.tesla.com/blog/all-our-patent-are-belong-you",
    isFree: true,
  },
  {
    id: "16",
    slug: "google-patents",
    name: "Google Patent Search",
    description: "Search and access millions of patents and patent applications worldwide.",
    category: "Research",
    type: "patent",
    tags: ["Research", "Database", "Search"],
    url: "https://patents.google.com",
    isFree: true,
  },
  {
    id: "17",
    slug: "ibm-open-patents",
    name: "IBM Open Patents",
    description: "IBM's commitment to open innovation with freely available patent pledges.",
    category: "Technology",
    type: "patent",
    tags: ["Technology", "Cloud", "AI"],
    url: "https://www.ibm.com/opensource",
    isFree: true,
  },
  {
    id: "18",
    slug: "open-invention-network",
    name: "Open Invention Network",
    description: "Patent non-aggression community supporting freedom of action in Linux.",
    category: "Linux",
    type: "patent",
    tags: ["Linux", "Protection", "Community"],
    url: "https://openinventionnetwork.com",
    isFree: true,
  },
]

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

export function getToolsByType(type: Tool["type"]) {
  return sampleTools.filter((tool) => tool.type === type)
}

export function getToolBySlug(slug: string) {
  return sampleTools.find((tool) => tool.slug === slug)
}

export function searchTools(query: string, type?: Tool["type"]) {
  const lowercaseQuery = query.toLowerCase()
  return sampleTools.filter((tool) => {
    const matchesQuery =
      tool.name.toLowerCase().includes(lowercaseQuery) ||
      tool.description.toLowerCase().includes(lowercaseQuery) ||
      tool.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery))
    const matchesType = type ? tool.type === type : true
    return matchesQuery && matchesType
  })
}
