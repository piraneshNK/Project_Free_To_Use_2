"use client"

import { useState } from "react"
import { SUBSCRIPTIONS } from "./data"
import { Check, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

interface SubscriptionGridProps {
    selected: string[]
    onToggle: (id: string) => void
}

export function SubscriptionGrid({ selected, onToggle }: SubscriptionGridProps) {
    const [showAll, setShowAll] = useState(false)

    // Show top 9 by default
    const displayedSubscriptions = showAll ? SUBSCRIPTIONS : SUBSCRIPTIONS.slice(0, 9)

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <AnimatePresence>
                    {displayedSubscriptions.map((sub) => {
                        const isSelected = selected.includes(sub.id)
                        const Icon = sub.icon

                        return (
                            <motion.div
                                key={sub.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => onToggle(sub.id)}
                                className={cn(
                                    "relative cursor-pointer rounded-xl border p-6 transition-all duration-300",
                                    "bg-white/5 backdrop-blur-md hover:bg-white/10 dark:bg-black/20 dark:hover:bg-black/30",
                                    isSelected
                                        ? "border-primary shadow-[0_0_20px_rgba(var(--primary),0.3)] ring-1 ring-primary"
                                        : "border-white/10 hover:border-white/20"
                                )}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={cn(
                                                "p-2 rounded-lg transition-colors",
                                                isSelected ? "bg-primary text-primary-foreground" : "bg-white/10 text-muted-foreground"
                                            )}
                                        >
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg">{sub.name}</h3>
                                            <p className="text-sm text-muted-foreground">${sub.price}/mo</p>
                                        </div>
                                    </div>
                                    <div
                                        className={cn(
                                            "w-6 h-6 rounded-full border flex items-center justify-center transition-colors",
                                            isSelected
                                                ? "bg-primary border-primary text-primary-foreground"
                                                : "border-white/20 bg-transparent"
                                        )}
                                    >
                                        {isSelected && <Check className="w-4 h-4" />}
                                    </div>
                                </div>

                                <div className="mt-4 flex flex-wrap gap-2">
                                    {sub.features.map((feature) => (
                                        <span
                                            key={feature}
                                            className="text-xs px-2 py-1 rounded-full bg-white/5 text-muted-foreground border border-white/5"
                                        >
                                            {feature}
                                        </span>
                                    ))}
                                </div>

                                {isSelected && (
                                    <motion.div
                                        layoutId="outline"
                                        className="absolute inset-0 rounded-xl border-2 border-primary pointer-events-none"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    />
                                )}
                            </motion.div>
                        )
                    })}
                </AnimatePresence>
            </div>

            <div className="flex justify-center">
                <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setShowAll(!showAll)}
                    className="border-white/10 hover:bg-white/5 gap-2 rounded-full px-8"
                >
                    {showAll ? (
                        <>
                            Show Less <ChevronUp className="w-4 h-4" />
                        </>
                    ) : (
                        <>
                            Show All {SUBSCRIPTIONS.length} Tools <ChevronDown className="w-4 h-4" />
                        </>
                    )}
                </Button>
            </div>
        </div>
    )
}
