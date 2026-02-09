"use client"

import { motion } from "framer-motion"
import { SUBSCRIPTIONS } from "./data"

interface VennDiagramProps {
    selected: string[]
}

export function VennDiagram({ selected }: VennDiagramProps) {
    // Calculate weights for each category based on selected tools
    const getWeights = () => {
        let reasoning = 0
        let search = 0
        let coding = 0

        selected.forEach((id) => {
            const sub = SUBSCRIPTIONS.find((s) => s.id === id)
            if (!sub) return

            // Check Categories & Features
            const lowerFeats = sub.features.map(f => f.toLowerCase())

            // Reasoning / Logic / Writing / Productivity
            if (
                sub.category === "reasoning" ||
                sub.category === "writing" ||
                sub.category === "productivity" ||
                sub.category === "hybrid" ||
                lowerFeats.some(f => f.includes("reasoning") || f.includes("writing") || f.includes("notes") || f.includes("summary"))
            ) {
                reasoning += 1
            }

            // Search / Knowledge
            if (
                sub.category === "search" ||
                sub.category === "hybrid" ||
                lowerFeats.some(f => f.includes("search") || f.includes("research") || f.includes("data") || f.includes("citation"))
            ) {
                search += 1
            }

            // Coding / Technical
            if (
                sub.category === "coding" ||
                sub.category === "hybrid" ||
                lowerFeats.some(f => f.includes("coding") || f.includes("code") || f.includes("development"))
            ) {
                coding += 1
            }
        })

        return { reasoning, search, coding }
    }

    const { reasoning, search, coding } = getWeights()

    const maxVal = Math.max(reasoning, search, coding, 1)
    const baseSize = 80 // Base size in px
    const scaleFactor = 40 // Pixels to add per unit

    return (
        <div className="relative h-[300px] w-full flex items-center justify-center overflow-hidden">
            {/* Background/Context */}
            <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                <div className="w-[200px] h-[200px] rounded-full border border-white/50" />
            </div>

            {/* Reasoning Circle (Top) */}
            <motion.div
                animate={{
                    scale: reasoning > 0 ? 1 + (reasoning * 0.2) : 0,
                    opacity: reasoning > 0 ? 0.6 : 0,
                }}
                className="absolute top-10 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full bg-blue-500/40 mix-blend-screen blur-xl"
            />
            <motion.div
                animate={{
                    scale: reasoning > 0 ? 1 : 0,
                    opacity: reasoning > 0 ? 1 : 0,
                }}
                className="absolute top-16 left-1/2 -translate-x-1/2 text-center z-10"
            >
                <span className="font-bold text-blue-600 dark:text-blue-200">Reasoning</span>
            </motion.div>

            {/* Search Circle (Bottom Left) */}
            <motion.div
                animate={{
                    scale: search > 0 ? 1 + (search * 0.2) : 0,
                    opacity: search > 0 ? 0.6 : 0,
                }}
                className="absolute bottom-10 left-1/3 -translate-x-1/2 w-32 h-32 rounded-full bg-green-500/40 mix-blend-screen blur-xl"
            />
            <motion.div
                animate={{
                    scale: search > 0 ? 1 : 0,
                    opacity: search > 0 ? 1 : 0,
                }}
                className="absolute bottom-16 left-[35%] -translate-x-1/2 text-center z-10"
            >
                <span className="font-bold text-green-600 dark:text-green-200">Search</span>
            </motion.div>


            {/* Coding Circle (Bottom Right) */}
            <motion.div
                animate={{
                    scale: coding > 0 ? 1 + (coding * 0.2) : 0,
                    opacity: coding > 0 ? 0.6 : 0,
                }}
                className="absolute bottom-10 right-1/3 translate-x-1/2 w-32 h-32 rounded-full bg-purple-500/40 mix-blend-screen blur-xl"
            />
            <motion.div
                animate={{
                    scale: coding > 0 ? 1 : 0,
                    opacity: coding > 0 ? 1 : 0,
                }}
                className="absolute bottom-16 right-[35%] translate-x-1/2 text-center z-10"
            >
                <span className="font-bold text-purple-600 dark:text-purple-200">Coding</span>
            </motion.div>

            {/* Intersection Label if overlapping */}
            {selected.length > 0 && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                    <div className="w-4 h-4 rounded-full bg-white/20 shadow-[0_0_15px_white]" />
                </div>
            )}

        </div>
    )
}
