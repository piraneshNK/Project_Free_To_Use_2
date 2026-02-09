"use client"

import { AlertTriangle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface RedundancyAlertProps {
    selected: string[]
}

export function RedundancyAlert({ selected }: RedundancyAlertProps) {
    const getAlerts = () => {
        const alerts = []

        // ChatGPT + Claude redundancy
        if (selected.includes("chatgpt") && selected.includes("claude")) {
            alerts.push({
                id: "reasoning-redundancy",
                title: "Reasoning & Coding Redundancy Detected",
                message: "You are paying for two primary reasoning engines. Choosing just one could save you $240/yr.",
                wasteAmount: 240,
            })
        }

        // Gemini + Perplexity redundancy
        if (selected.includes("gemini") && selected.includes("perplexity")) {
            alerts.push({
                id: "search-redundancy",
                title: "Search & Research Redundancy Detected",
                message: "Gemini Advanced overlaps significantly with Perplexity Pro for search tasks. Consolidating could save you $240/yr.",
                wasteAmount: 240,
            })
        }

        return alerts
    }

    const alerts = getAlerts()

    return (
        <div className="space-y-4">
            <AnimatePresence>
                {alerts.map((alert) => (
                    <motion.div
                        key={alert.id}
                        initial={{ opacity: 0, height: 0, scale: 0.95 }}
                        animate={{ opacity: 1, height: "auto", scale: 1 }}
                        exit={{ opacity: 0, height: 0, scale: 0.95 }}
                        className="rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-4 flex items-start gap-4 overflow-hidden"
                    >
                        <div className="p-2 bg-yellow-500/20 rounded-lg text-yellow-500 shrink-0">
                            <AlertTriangle className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-yellow-600 dark:text-yellow-400">
                                {alert.title}
                            </h3>
                            <p className="text-sm text-yellow-600/80 dark:text-yellow-400/80 mt-1">
                                {alert.message}
                            </p>
                        </div>
                        <div className="ml-auto flex items-center gap-1 text-red-500 font-bold whitespace-nowrap">
                            -${alert.wasteAmount}/yr
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    )
}
