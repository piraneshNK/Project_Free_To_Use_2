"use client"

import { Sparkles, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

interface RecommendationCardProps {
    selected: string[]
}

export function RecommendationCard({ selected }: RecommendationCardProps) {
    const getRecommendation = () => {
        if (selected.length === 0) return null

        // If Spending > $40
        if (selected.length > 2) {
            return {
                title: "Consolidate to 'The Power Couple'",
                description: "ChatGPT Plus + Perplexity Pro covers Reasoning, Coding, and Deep Research for just $40/mo. You don't need the rest.",
                action: "Switch & Save",
            }
        }

        // Specific redundancy: ChatGPT + Claude
        if (selected.includes("chatgpt") && selected.includes("claude")) {
            return {
                title: "Pick One Champion",
                description: "Unless you are an AI researcher, you don't need both. Claude 3.5 Sonnet (via Pro) is currently top-tier for coding, while ChatGPT is a great all-rounder.",
                action: "Drop One",
            }
        }

        // Specific redundancy: Gemini + Perplexity
        if (selected.includes("gemini") && selected.includes("perplexity")) {
            return {
                title: "Choose Your Search Engine",
                description: "Gemini is integrating deep search, but Perplexity is purpose-built for it. If you code, keep Perplexity + a coding model. If you are deep in Google Workspace, keep Gemini.",
                action: "Decide",
            }
        }

        return {
            title: "Optimized Stack",
            description: "Your current selection looks efficient! You have good coverage without obvious waste.",
            action: "Keep It",
        }
    }

    const rec = getRecommendation()

    if (!rec) return null

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-2xl p-6 backdrop-blur-xl"
        >
            <div className="flex items-start gap-4">
                <div className="p-3 bg-indigo-500/20 rounded-xl text-indigo-400">
                    <Sparkles className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="text-xl font-semibold mb-2">{rec.title}</h3>
                    <p className="text-muted-foreground mb-4">{rec.description}</p>
                    <div className="inline-flex items-center gap-2 text-indigo-400 font-medium">
                        {rec.action} <ArrowRight className="w-4 h-4" />
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
