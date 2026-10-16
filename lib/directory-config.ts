import type { Tool } from "@/lib/types"

export type DirectoryId = "app" | "api" | "open-source" | "patent" | "llm"

export interface DirectoryFaq {
  question: string
  answer: string
}

export interface DirectoryConfig {
  id: DirectoryId
  path: string
  name: string
  title: string
  description: string
  heading: string
  introHeading: string
  intro: string[]
  itemListDescription: string
  singular: string
  plural: string
  icon: "brain" | "code" | "git-branch" | "lightbulb"
  categories: { id: string; label: string }[]
  stats?: { label: string; count: string }[]
  faqTitle: string
  faqs: DirectoryFaq[]
}

export const DIRECTORY_PAGE_SIZE = 48
export const SITE_URL = "https://projectfreetouse.com"

export const directories: DirectoryConfig[] = [
  {
    id: "app",
    path: "/ai-tools",
    name: "AI Tools",
    title: "Best Free AI Tools Directory - Writing, Image, Video & More",
    description: "Explore free AI tools for writing, image generation, video editing, coding, and productivity in our curated directory.",
    heading: "Best Free AI Tools Directory",
    introHeading: "The Ultimate Free AI Tools Directory",
    intro: [
      "Welcome to ProjectFreeToUse, the most comprehensive directory of free AI tools on the internet. Whether you're a developer, content creator, student, or entrepreneur, our curated collection helps you discover powerful AI-powered applications without spending a dime.",
      "Our directory features hundreds of verified free AI tools across multiple categories including Writing AI for content generation and grammar checking, Image AI for art generation and photo editing, Video AI for video creation and editing, Coding AI for code completion and debugging, and Productivity AI for workflow automation.",
      "Every tool in our directory is verified to offer a genuine free tier - no credit card required. We help millions of users discover the best free artificial intelligence tools to boost productivity, enhance creativity, and build amazing projects. Start exploring our AI tools directory today!",
    ],
    itemListDescription: "Curated collection of free AI tools for writing, image generation, video editing, and productivity.",
    singular: "AI tool",
    plural: "AI tools",
    icon: "brain",
    categories: [
      { id: "writing", label: "Writing AI" },
      { id: "image", label: "Image AI" },
      { id: "video", label: "Video AI" },
      { id: "productivity", label: "Productivity AI" },
      { id: "coding", label: "Coding AI" },
      { id: "student", label: "Student AI" },
    ],
    faqTitle: "Frequently Asked Questions About Free AI Tools",
    faqs: [
      {
        question: "What are the best free AI tools?",
        answer: "The best free AI tools include ChatGPT (free tier), Claude, Canva AI, Notion AI, and GitHub Copilot. Our directory curates hundreds of free AI tools across writing, image generation, video editing, and productivity categories.",
      },
      {
        question: "Are these AI tools really free to use?",
        answer: "Yes! Every AI tool listed in our directory offers a free tier or is completely free. We verify each submission to ensure it provides genuine free access, not just free trials.",
      },
      {
        question: "What types of free AI tools are available?",
        answer: "Our directory includes Writing AI (content generators, grammar checkers), Image AI (art generators, photo editors), Video AI (video generators, editors), Productivity AI (automation, scheduling), Coding AI (code assistants, debuggers), and Student AI (study tools, tutoring).",
      },
      {
        question: "How do I choose the right AI tool for my needs?",
        answer: "Use the category links to narrow down tools by type. Read descriptions on each tool page. Most tools offer free tiers so you can test before committing.",
      },
      {
        question: "Can I submit my free AI tool to this directory?",
        answer: "Absolutely! We welcome submissions of free AI tools. Visit our Submit Tool page, fill out the form with your tool's details, and our team will review it within 48 hours.",
      },
    ],
  },
  {
    id: "api",
    path: "/apis",
    name: "Free APIs",
    title: "Best Free APIs for Developers",
    description: "Find free APIs for AI, weather, finance, and development projects in our curated directory.",
    heading: "Best Free APIs Directory",
    introHeading: "The Best Free APIs for Developers",
    intro: [
      "Find the perfect free API for your next project. Our curated directory features hundreds of free APIs across AI, weather, finance, and developer tools - all verified to offer genuine free tiers without credit card requirements.",
      "Whether you need AI APIs for natural language processing, Weather APIs for forecasts and historical data, Finance APIs for stock and crypto data, or Developer APIs for GitHub integration and more - we have you covered.",
    ],
    itemListDescription: "Curated collection of free APIs for AI, weather, finance, and development.",
    singular: "API",
    plural: "APIs",
    icon: "code",
    categories: [
      { id: "ai", label: "AI APIs" },
      { id: "weather", label: "Weather APIs" },
      { id: "finance", label: "Finance APIs" },
      { id: "developer", label: "Developer APIs" },
    ],
    faqTitle: "Frequently Asked Questions About Free APIs",
    faqs: [
      {
        question: "What are the best free APIs for developers?",
        answer: "The best free APIs include OpenAI API (free tier), GitHub REST API, OpenWeather API, and Alpha Vantage for finance data. Our directory lists hundreds of free APIs across AI, weather, finance, and developer categories.",
      },
      {
        question: "Do these APIs require a credit card?",
        answer: "Most APIs in our directory offer free tiers that don't require a credit card. Some may require registration for an API key, but you won't be charged for basic usage within their free limits.",
      },
      {
        question: "How do I integrate these APIs into my project?",
        answer: "Each API listing includes the endpoint URL with a copy button. Click to copy the endpoint, then use it in your HTTP requests. Visit the API's documentation (linked on each page) for authentication details and usage examples.",
      },
      {
        question: "What's the difference between free and paid API tiers?",
        answer: "Free API tiers typically have rate limits (requests per minute/day) and may offer fewer features. They're perfect for development, testing, and small projects. Paid tiers offer higher limits, more features, and SLAs for production use.",
      },
      {
        question: "Can I use these APIs for commercial projects?",
        answer: "Most APIs allow commercial use on their free tiers, but check each API's terms of service. Some may require attribution or have specific usage restrictions for commercial applications.",
      },
    ],
  },
  {
    id: "open-source",
    path: "/open-source",
    name: "Open Source",
    title: "Best Free Open Source Software Directory",
    description: "Discover open source projects and software with MIT, Apache, and GPL licenses.",
    heading: "Best Free Open Source Software Tools",
    introHeading: "The Ultimate Open Source Software Directory",
    intro: [
      "Discover the best free open source software projects on the internet. Our curated directory features hundreds of high-quality GitHub projects with permissive licenses like MIT, Apache 2.0, and GPL - all free to use for personal and commercial projects.",
      "Whether you need web frameworks like Next.js and React, databases like Supabase and PostgreSQL, CSS frameworks like Tailwind CSS, or developer tools for building modern applications - find everything you need to build faster and smarter.",
    ],
    itemListDescription: "Curated collection of open source projects with MIT, Apache, and GPL licenses.",
    singular: "project",
    plural: "projects",
    icon: "git-branch",
    categories: [
      { id: "framework", label: "Frameworks" },
      { id: "database", label: "Database" },
      { id: "backend", label: "Backend" },
      { id: "frontend", label: "Frontend" },
      { id: "devtools", label: "Dev Tools" },
      { id: "mit", label: "MIT" },
      { id: "apache", label: "Apache 2.0" },
      { id: "gpl", label: "GPL" },
    ],
    stats: [
      { label: "MIT License", count: "500+" },
      { label: "Apache 2.0", count: "300+" },
      { label: "GPL", count: "200+" },
    ],
    faqTitle: "Frequently Asked Questions About Open Source Software",
    faqs: [
      {
        question: "What is open source software?",
        answer: "Open source software is code that is publicly available for anyone to view, modify, and distribute. Popular licenses include MIT, Apache 2.0, and GPL. Our directory features the best open source projects with permissive licenses.",
      },
      {
        question: "What's the difference between MIT and Apache licenses?",
        answer: "MIT is a permissive license with minimal restrictions - you can use the code commercially with attribution. Apache 2.0 is similar but includes patent rights protection. GPL requires derivative works to also be open source.",
      },
      {
        question: "Can I use open source software for commercial projects?",
        answer: "Yes! MIT and Apache 2.0 licensed projects can be used commercially. Just check the specific license terms - most require attribution in your documentation or source code.",
      },
      {
        question: "How do I contribute to open source projects?",
        answer: "Start by finding a project you're interested in, read their contribution guidelines, and look for 'good first issue' labels. Fork the repository, make your changes, and submit a pull request.",
      },
      {
        question: "What are GitHub stars and why do they matter?",
        answer: "GitHub stars indicate community interest and popularity. More stars typically mean better documentation, active maintenance, and community support. Our directory shows star counts to help you find quality projects.",
      },
    ],
  },
  {
    id: "patent",
    path: "/open-patents",
    name: "Open Patents",
    title: "Free Open Patents & Innovation Resources",
    description: "Explore patent databases, prior art search tools, and innovation resources.",
    heading: "Best Free Open Patents & Innovation Resources",
    introHeading: "The Ultimate Open Patents & Innovation Directory",
    intro: [
      "Discover the best free patent databases and innovation resources. Our curated directory features patent search tools, prior art databases, and innovation resources - all free to access for research and commercial use.",
      "Whether you need patent search tools like Google Patents, prior art databases for research, innovation resources for startups, or patent analytics for competitive intelligence - find everything you need to innovate smarter.",
    ],
    itemListDescription: "Curated collection of patent databases, prior art search tools, and innovation resources.",
    singular: "resource",
    plural: "resources",
    icon: "lightbulb",
    categories: [
      { id: "ai", label: "AI & ML" },
      { id: "blockchain", label: "Blockchain" },
      { id: "iot", label: "IoT" },
      { id: "biotech", label: "Biotech" },
      { id: "software", label: "Software" },
    ],
    stats: [
      { label: "Patent DBs", count: "50+" },
      { label: "Search Tools", count: "30+" },
      { label: "Resources", count: "20+" },
    ],
    faqTitle: "Frequently Asked Questions About Open Patents",
    faqs: [
      {
        question: "What are open patents?",
        answer: "Open patents are publicly available patent documents and innovation resources that can be freely accessed, studied, and sometimes used. Our directory features patent databases, prior art search tools, and innovation resources.",
      },
      {
        question: "Can I use patented technology for free?",
        answer: "It depends. Some patents are in the public domain after expiration, while others may have open licensing terms. Always check the specific patent status and licensing before commercial use.",
      },
      {
        question: "What is prior art and why does it matter?",
        answer: "Prior art refers to existing knowledge or inventions that predate a patent application. It's crucial for determining patent validity and can help you avoid infringing on existing patents.",
      },
      {
        question: "How do I search for patents?",
        answer: "Use patent databases like Google Patents, USPTO, or EPO. Search by keywords, patent numbers, or inventors. Our directory lists the best free patent search tools and resources.",
      },
      {
        question: "What's the difference between a patent and a trademark?",
        answer: "Patents protect inventions and processes, while trademarks protect brand names and logos. Patents expire after 20 years, while trademarks can be renewed indefinitely.",
      },
    ],
  },
  {
    id: "llm",
    path: "/llm-models",
    name: "LLM Models",
    title: "Free LLM Models Directory",
    description: "Discover free and open-source large language models for text generation, code completion, and embeddings.",
    heading: "Free LLM Models Directory",
    introHeading: "The Ultimate Free LLM Models Directory",
    intro: [
      "Welcome to the most comprehensive directory of free and open-source LLM models. Whether you're a developer, researcher, or AI enthusiast, our curated collection helps you discover powerful language models that you can run locally, fine-tune, or integrate into your applications.",
      "Our directory features models from leading providers including Meta's Llama 2, Mistral AI, Microsoft's Phi, and hundreds more on Hugging Face. All models are verified to have permissive licenses allowing commercial use.",
      "From text generation and code completion to embeddings and multimodal models - find everything you need to build the next generation of AI applications!",
    ],
    itemListDescription: "Curated collection of free and open-source large language models for text generation, code completion, and embeddings.",
    singular: "model",
    plural: "models",
    icon: "brain",
    categories: [
      { id: "text", label: "Text Generation" },
      { id: "code", label: "Code Generation" },
      { id: "embedding", label: "Embeddings" },
      { id: "multimodal", label: "Multimodal" },
    ],
    faqTitle: "Frequently Asked Questions About LLM Models",
    faqs: [
      {
        question: "What are LLM models and how do they work?",
        answer: "Large Language Models (LLMs) are AI models trained on vast amounts of text data to understand and generate human-like text. They use transformer architecture and can perform tasks like text generation, translation, summarization, and code completion.",
      },
      {
        question: "Which LLM models are free to use?",
        answer: "Many LLM models are freely available including Llama 2, Mistral, Mixtral, Phi-2, and various models on Hugging Face. Our directory features only models with permissive licenses that allow commercial use.",
      },
      {
        question: "How do I run LLM models locally?",
        answer: "You can run LLMs locally using tools like Ollama, LM Studio, or text-generation-webui. Most models require significant GPU memory (8GB+ VRAM recommended). Smaller models like Phi-2 and Llama 2 7B can run on consumer hardware.",
      },
      {
        question: "What's the difference between open-source and proprietary LLMs?",
        answer: "Open-source LLMs like Llama 2 and Mistral have publicly available weights and can be run locally or fine-tuned. Proprietary models like GPT-4 are only accessible via API. Open-source models offer more control and privacy.",
      },
      {
        question: "Can I use these LLM models for commercial projects?",
        answer: "Most models in our directory have permissive licenses (Apache 2.0, MIT) allowing commercial use. Always check the specific model's license on Hugging Face or the provider's website before using in production.",
      },
    ],
  },
]

export function getDirectoryConfig(directory: DirectoryId): DirectoryConfig {
  const config = directories.find((item) => item.id === directory)
  if (!config) throw new Error(`Unknown directory: ${directory}`)
  return config
}

export function getDirectoryByPath(path: string): DirectoryConfig | undefined {
  return directories.find((directory) => directory.path === path)
}

function normalizeCategory(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "")
}

export function filterDirectoryTools(
  tools: Tool[],
  directory: DirectoryConfig,
  categoryId?: string,
): Tool[] {
  if (!categoryId) return tools

  return tools.filter((tool) => {
    const needle = normalizeCategory(categoryId)
    return [tool.category, tool.license ?? "", ...tool.tags]
      .some((value) => normalizeCategory(value).includes(needle))
  })
}

export function getDirectoryUrl(
  directory: DirectoryConfig,
  page = 1,
  categoryId?: string,
): string {
  const base = categoryId
    ? `${directory.path}/category/${categoryId}`
    : directory.path
  return page > 1 ? `${base}/page/${page}` : base
}

export function getDirectoryMetadata(
  directory: DirectoryConfig,
  page = 1,
  categoryId?: string,
) {
  const category = directory.categories.find((item) => item.id === categoryId)
  const title = `${category ? `${category.label} - ` : ""}${directory.title}${page > 1 ? ` - Page ${page}` : ""}`
  const description = category
    ? `Browse ${category.label.toLowerCase()} in our ${directory.name.toLowerCase()} directory. ${directory.description}`
    : directory.description
  const canonical = `${SITE_URL}${getDirectoryUrl(directory, page, categoryId)}`

  return {
    title,
    description,
    openGraph: { title, description, type: "website" as const, url: canonical },
    twitter: { card: "summary_large_image" as const, title, description },
    alternates: { canonical },
  }
}

export function getDirectoryCategoryHeading(directory: DirectoryConfig, categoryLabel: string): string {
  switch (directory.id) {
    case "app":
      return `${categoryLabel} Tools`
    case "api":
      return categoryLabel
    case "open-source":
      return `${categoryLabel} Open Source Projects`
    case "patent":
      return `${categoryLabel} Patent Resources`
    case "llm":
      return `${categoryLabel} LLM Models`
  }
}

export function parseDirectorySegments(segments: string[]) {
  let categoryId: string | undefined
  let page = 1

  if (segments[0] === "category" && segments[1]) {
    categoryId = segments[1]
    if (segments[2] === "page" && segments[3]) page = Number(segments[3])
  } else if (segments[0] === "page" && segments[1]) {
    page = Number(segments[1])
  } else {
    return null
  }

  if (!Number.isSafeInteger(page) || page < 1) return null
  return { categoryId, page }
}
