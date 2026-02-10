"use client"

import Link from "next/link"
import { ArrowRight, Brain, Calendar, Calculator } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

const freeTools = [
    {
        title: "AI Overlap & Burn Calculator",
        description: "Analyze your AI subscription capabilities, visualize redundancy, and calculate monthly costs.",
        href: "/ai-overlap-burn-calculator",
        icon: Calculator,
        color: "text-blue-500",
        bgColor: "bg-blue-500/10",
    },
    {
        title: "Age Calculator",
        description: "Calculate your exact age in years, months, and days with a next birthday countdown.",
        href: "/age-calculator",
        icon: Calendar,
        color: "text-red-500",
        bgColor: "bg-red-500/10",
    },
    {
        title: "Percentage Calculator",
        description: "All-in-one percentage calculator with 5 calculation modes. Calculate percentages, differences, and changes instantly.",
        href: "/percentage-calculator",
        icon: Calculator,
        color: "text-green-500",
        bgColor: "bg-green-500/10",
    },
]

export default function FreeToolsClient() {
    return (
        <div className="min-h-screen bg-background pt-24 pb-16">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="text-center mb-16 space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                        Free Utilities & Tools
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Useful calculators and utilities to help you plan, organize, and optimize.
                        Completely free to use.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {freeTools.map((tool, index) => (
                        <motion.div
                            key={tool.href}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link href={tool.href} className="block h-full">
                                <Card className="h-full transition-all hover:border-primary/50 hover:shadow-lg">
                                    <CardHeader>
                                        <div className={`w-12 h-12 rounded-xl ${tool.bgColor} ${tool.color} flex items-center justify-center mb-4`}>
                                            <tool.icon className="w-6 h-6" />
                                        </div>
                                        <CardTitle className="text-xl">{tool.title}</CardTitle>
                                        <CardDescription className="line-clamp-2">
                                            {tool.description}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center text-sm font-medium text-primary">
                                            Try Tool <ArrowRight className="ml-2 w-4 h-4" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}

                    {/* Placeholder/Call to Action for more tools */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Card className="h-full border-dashed bg-muted/30 flex flex-col items-center justify-center text-center p-6">
                            <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-4 text-muted-foreground">
                                <Brain className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">More Coming Soon</h3>
                            <p className="text-muted-foreground mb-6">
                                We are constantly building new free tools for the community.
                            </p>
                            <Link href="/submit">
                                <Button variant="outline">Submit a Tool Request</Button>
                            </Link>
                        </Card>
                    </motion.div>
                </div>

                {/* SEO Content Section */}
                <section className="mt-24 border-t border-border/50 pt-16 max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-8">Free Online Calculators & Utilities</h2>
                    <div className="space-y-6 text-muted-foreground leading-relaxed">
                        <p>
                            Welcome to our collection of <strong>free online calculators and utilities</strong> designed to make your life easier.
                            All tools are completely free to use, require no registration, and work instantly in your browser.
                        </p>
                        <div className="grid md:grid-cols-2 gap-6 mt-8">
                            <div>
                                <h3 className="text-lg font-semibold text-foreground mb-2">Percentage Calculator</h3>
                                <p className="text-sm">
                                    Our all-in-one percentage calculator includes 5 calculation modes: find percentages,
                                    calculate percentage differences, percentage increases/decreases, and more. Perfect for
                                    students, professionals, and anyone needing quick percentage calculations.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-foreground mb-2">Age Calculator</h3>
                                <p className="text-sm">
                                    Calculate your exact age down to the second with our precision age calculator.
                                    Features include live countdown to your next birthday with hours, minutes, and seconds.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-foreground mb-2">AI Subscription Calculator</h3>
                                <p className="text-sm">
                                    Optimize your AI tool spending by analyzing subscription overlap and redundancy.
                                    Compare 50+ AI tools including ChatGPT, Claude, Gemini, and more to reduce your monthly costs.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-foreground mb-2">Why Use Our Tools?</h3>
                                <ul className="text-sm space-y-1 list-disc list-inside">
                                    <li>100% Free - No hidden fees or subscriptions</li>
                                    <li>No Registration Required</li>
                                    <li>Fast & Accurate Results</li>
                                    <li>Mobile-Friendly Design</li>
                                    <li>Privacy-Focused - No data collection</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
