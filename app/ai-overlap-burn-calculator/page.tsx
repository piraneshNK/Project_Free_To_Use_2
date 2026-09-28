"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { SUBSCRIPTIONS, EXCHANGE_RATES, Currency } from "@/components/calculator/data"
import { SubscriptionGrid } from "@/components/calculator/subscription-grid"
import { BurnDisplay } from "@/components/calculator/burn-display"
import { RedundancyAlert } from "@/components/calculator/redundancy-alert"
import { VennDiagram } from "@/components/calculator/venn-diagram"
import { RecommendationCard } from "@/components/calculator/recommendation-card"
import { CurrencySelector } from "@/components/calculator/currency-selector"
import Script from "next/script"

export default function CalculatorPage() {
    const [selected, setSelected] = useState<string[]>([])
    const [currency, setCurrency] = useState<Currency>("USD")
    const [isAuto, setIsAuto] = useState(true)

    // Auto-detect currency based on locale
    useEffect(() => {
        if (!isAuto) return

        try {
            const userLocale = navigator.language
            // Simple mapping for demo purposes. In production, use a more robust library or API.
            // This covers major regions based on language code.
            if (userLocale.includes("IN")) setCurrency("INR")
            else if (userLocale.includes("GB")) setCurrency("GBP")
            else if (userLocale.includes("JP")) setCurrency("JPY")
            else if (userLocale.includes("EU") || userLocale.includes("DE") || userLocale.includes("FR") || userLocale.includes("IT") || userLocale.includes("ES")) setCurrency("EUR")
            else if (userLocale.includes("CA")) setCurrency("CAD")
            else if (userLocale.includes("AU")) setCurrency("AUD")
            else if (userLocale.includes("BR")) setCurrency("BRL")
            else setCurrency("USD")
        } catch (e) {
            console.error("Currency auto-detect failed", e)
            setCurrency("USD")
        }
    }, [isAuto])

    const toggleSubscription = (id: string) => {
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        )
    }

    const monthlyCostUSD = selected.reduce((total, id) => {
        const sub = SUBSCRIPTIONS.find((s) => s.id === id)
        return total + (sub?.price || 0)
    }, 0)

    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "SoftwareApplication",
                "name": "AI Overlap & Burn Calculator",
                "applicationCategory": "UtilitiesApplication",
                "operatingSystem": "Web",
                "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD",
                },
                "description": "Compare AI subscription costs, review overlapping capabilities, and estimate potential monthly savings.",
                "url": "https://projectfreetouse.com/ai-overlap-burn-calculator",
                "keywords": [
                    "AI subscription calculator",
                    "AI cost calculator",
                    "AI subscription cost comparison",
                    "AI spending calculator",
                    "AI tool overlap checker",
                    "AI subscription savings calculator",
                    "ChatGPT Claude Gemini cost comparison",
                ],
                "featureList": [
                    "Estimate monthly AI subscription costs",
                    "Compare overlapping AI tool capabilities",
                    "Review subscription recommendations",
                ],
            },
            {
                "@type": "FAQPage",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "How can I compare the cost of AI subscriptions?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Select the AI subscriptions you currently use. The calculator totals their monthly cost and displays the combined estimate in your selected currency.",
                        },
                    },
                    {
                        "@type": "Question",
                        "name": "What does AI tool overlap mean?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "AI tool overlap describes capabilities shared by multiple subscriptions, such as reasoning, search, or coding. Reviewing overlap can help you decide whether every subscription is useful for your workflow.",
                        },
                    },
                    {
                        "@type": "Question",
                        "name": "Can this calculator help reduce my AI subscription bill?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "It helps you review your selected subscriptions, their estimated cost, and overlapping capabilities so you can decide which plans to keep.",
                        },
                    },
                ],
            },
        ],
    }

    return (
        <div className="min-h-screen bg-background text-foreground pb-20 pt-24">
            <Script
                id="calculator-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="container mx-auto px-4 py-12 max-w-7xl">
                <div className="mb-8 flex flex-col items-start gap-4">
                    <Link
                        href="/free-tools"
                        className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Free Tools
                    </Link>
                    <CurrencySelector
                        currentCurrency={currency}
                        onCurrencyChange={setCurrency}
                        isAuto={isAuto}
                        onAutoToggle={setIsAuto}
                    />
                </div>

                <header className="mb-16 space-y-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                        AI Overlap & Burn Calculator
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto mt-4">
                        Compare 50+ top AI tools, visualize capabilities, and optimize your monthly subscription costs.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Main Selection Area */}
                    <div className="lg:col-span-7 space-y-8">
                        <section>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-semibold flex items-center gap-2">
                                    1. Select Your Stack
                                </h2>
                            </div>
                            <SubscriptionGrid selected={selected} onToggle={toggleSubscription} />
                        </section>

                        <section className="pt-8">
                            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                                3. Coverage Analysis
                            </h2>
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                                <VennDiagram selected={selected} />
                                <p className="text-center text-sm text-muted-foreground mt-4">
                                    Visualizing coverage across Reasoning, Search, and Coding capabilities.
                                </p>
                            </div>
                        </section>
                    </div>

                    {/* Sidebar / Results */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="sticky top-24 space-y-6">
                            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                                2. Your Impact
                            </h2>
                            <BurnDisplay
                                monthlyCost={monthlyCostUSD}
                                currency={currency}
                                rate={EXCHANGE_RATES[currency]}
                            />

                            <RedundancyAlert selected={selected} />

                            <RecommendationCard selected={selected} />
                        </div>
                    </div>
                </div>
            </div>

            {/* SEO / FAQ Section */}
            <section className="mt-24 border-t border-border/50 pt-16 max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions about AI Costs</h2>
                <div className="space-y-8">
                    <div>
                        <h3 className="text-xl font-semibold mb-2">How can I compare the cost of AI subscriptions?</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            Select the AI subscriptions you currently use. The calculator totals their monthly cost and displays the combined estimate in your selected currency.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-2">What does AI tool overlap mean?</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            AI tool overlap describes capabilities shared by multiple subscriptions, such as reasoning, search, or coding. Reviewing overlap can help you decide whether every subscription is useful for your workflow.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-2">Can this calculator help reduce my AI subscription bill?</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            It helps you review your selected subscriptions, their estimated cost, and overlapping capabilities so you can decide which plans to keep.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    )
}
