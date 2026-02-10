
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
]

export default function FreeToolsPage() {
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
                        transition={{ delay: 0.2 }}
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
            </div>
        </div>
    )
}
