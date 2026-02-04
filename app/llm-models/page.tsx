"use client"

import { useState, useMemo, useEffect } from "react"
import { motion } from "framer-motion"
import { Brain, Sparkles } from "lucide-react"
import { ToolCard, type Tool } from "@/components/tool-card"
import { SearchFilter } from "@/components/search-filter"
import { BreadcrumbSchema, ItemListSchema } from "@/components/json-ld"
import { FAQSection } from "@/components/faq-section"

const llmCategories = [
  { id: "text", label: "Text Generation" },
  { id: "code", label: "Code Generation" },
  { id: "embedding", label: "Embeddings" },
  { id: "multimodal", label: "Multimodal" },
]

const llmFaqs = [
  {
    question: "What are LLM models and how do they work?",
    answer: "Large Language Models (LLMs) are AI models trained on vast amounts of text data to understand and generate human-like text. They use transformer architecture and can perform tasks like text generation, translation, summarization, and code completion."
  },
  {
    question: "Which LLM models are free to use?",
    answer: "Many LLM models are freely available including Llama 2, Mistral, Mixtral, Phi-2, and various models on Hugging Face. Our directory features only models with permissive licenses that allow commercial use."
  },
  {
    question: "How do I run LLM models locally?",
    answer: "You can run LLMs locally using tools like Ollama, LM Studio, or text-generation-webui. Most models require significant GPU memory (8GB+ VRAM recommended). Smaller models like Phi-2 and Llama 2 7B can run on consumer hardware."
  },
  {
    question: "What's the difference between open-source and proprietary LLMs?",
    answer: "Open-source LLMs like Llama 2 and Mistral have publicly available weights and can be run locally or fine-tuned. Proprietary models like GPT-4 are only accessible via API. Open-source models offer more control and privacy."
  },
  {
    question: "Can I use these LLM models for commercial projects?",
    answer: "Most models in our directory have permissive licenses (Apache 2.0, MIT) allowing commercial use. Always check the specific model's license on Hugging Face or the provider's website before using in production."
  }
]

export default function LLMModelsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [models, setModels] = useState<Tool[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/tools')
      .then(res => res.json())
      .then((tools: Tool[]) => {
        // Filter for LLM models - they're stored as 'app' type with specific tags
        const llmModels = tools.filter(t =>
          t.tags.some(tag =>
            tag.toLowerCase().includes('llm') ||
            tag.toLowerCase().includes('language model') ||
            tag.toLowerCase().includes('embedding') ||
            tag.toLowerCase().includes('text generation')
          )
        )
        setModels(llmModels)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error loading LLM models:', err)
        setLoading(false)
      })
  }, [])

  const filteredModels = useMemo(() => {
    return models.filter((model) => {
      const matchesSearch =
        searchQuery === "" ||
        model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        model.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        model.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory =
        selectedCategory === null ||
        model.category.toLowerCase().includes(selectedCategory) ||
        model.tags.some((tag) => tag.toLowerCase().includes(selectedCategory))

      return matchesSearch && matchesCategory
    })
  }, [models, searchQuery, selectedCategory])

  return (
    <div className="pt-16">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://projectfreetouse.com" },
          { name: "LLM Models", url: "https://projectfreetouse.com/llm-models" }
        ]}
      />
      <ItemListSchema
        name="Best Free LLM Models Directory"
        description="Curated collection of free and open-source Large Language Models for text generation, code completion, and embeddings."
        items={filteredModels.slice(0, 10).map(model => ({
          name: model.name,
          url: `https://projectfreetouse.com/tool/${model.slug}`,
          description: model.description
        }))}
      />

      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Brain className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Free LLM Models Directory</h1>
              <p className="text-muted-foreground">
                Discover open-source Large Language Models for text generation, code completion, and more
              </p>
            </div>
          </div>
        </motion.div>

        {/* SEO Intro Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12 rounded-2xl border border-border bg-card/50 p-6 lg:p-8"
        >
          <h2 className="mb-4 text-xl font-semibold text-foreground">
            The Ultimate Free LLM Models Directory for 2024
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Welcome to the most comprehensive directory of <strong className="text-foreground">free and open-source LLM models</strong>.
              Whether you're a developer, researcher, or AI enthusiast, our curated collection helps you discover
              powerful language models that you can run locally, fine-tune, or integrate into your applications.
            </p>
            <p>
              Our directory features models from leading providers including <strong className="text-foreground">Meta's Llama 2</strong>,
              <strong className="text-foreground"> Mistral AI</strong>, <strong className="text-foreground">Microsoft's Phi</strong>,
              and hundreds more on <strong className="text-foreground">Hugging Face</strong>. All models are verified to have
              permissive licenses allowing commercial use.
            </p>
            <p>
              From <strong className="text-foreground">text generation</strong> and <strong className="text-foreground">code completion</strong> to
              <strong className="text-foreground"> embeddings</strong> and <strong className="text-foreground">multimodal models</strong> -
              find everything you need to build the next generation of AI applications!
            </p>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <SearchFilter
          placeholder="Search LLM models..."
          categories={llmCategories}
          onSearch={setSearchQuery}
          onFilterChange={setSelectedCategory}
          selectedCategory={selectedCategory}
        />

        {/* Results Count */}
        <p className="mb-6 text-sm text-muted-foreground">
          Showing {filteredModels.length} {filteredModels.length === 1 ? "model" : "models"}
          {searchQuery && ` for "${searchQuery}"`}
          {selectedCategory && ` in ${llmCategories.find((c) => c.id === selectedCategory)?.label}`}
        </p>

        {/* Models Grid */}
        {loading ? (
          <div className="py-16 text-center">
            <p className="text-lg text-muted-foreground">Loading LLM models...</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredModels.map((model, index) => (
              <ToolCard key={model.id} tool={model} index={index} />
            ))}
          </div>
        )}

        {filteredModels.length === 0 && !loading && (
          <div className="py-16 text-center">
            <p className="text-lg text-muted-foreground">No LLM models found matching your criteria.</p>
            <button
              className="mt-4 text-primary hover:underline"
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory(null)
              }}
            >
              Clear filters
            </button>
          </div>
        )}

        {/* FAQ Section */}
        <FAQSection
          title="Frequently Asked Questions About LLM Models"
          faqs={llmFaqs}
        />
      </div>
    </div>
  )
}
