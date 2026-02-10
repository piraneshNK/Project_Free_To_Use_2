"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Calculator, TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"

export default function PercentageCalculatorClient() {
    // Calculator 1: What is X% of Y?
    const [percent1, setPercent1] = useState("")
    const [value1, setValue1] = useState("")

    // Calculator 2: X is what % of Y?
    const [part, setPart] = useState("")
    const [whole, setWhole] = useState("")

    // Calculator 3: X is Y% of what?
    const [value3, setValue3] = useState("")
    const [percent3, setPercent3] = useState("")

    // Calculator 4: Percentage Difference
    const [oldValue, setOldValue] = useState("")
    const [newValue, setNewValue] = useState("")

    // Calculator 5: Percentage Change
    const [baseValue, setBaseValue] = useState("")
    const [changePercent, setChangePercent] = useState("")
    const [changeType, setChangeType] = useState<"increase" | "decrease">("increase")

    // Calculations
    const result1 = percent1 && value1 ? (parseFloat(percent1) / 100) * parseFloat(value1) : null
    const result2 = part && whole && parseFloat(whole) !== 0 ? (parseFloat(part) / parseFloat(whole)) * 100 : null
    const result3 = value3 && percent3 && parseFloat(percent3) !== 0 ? (parseFloat(value3) / parseFloat(percent3)) * 100 : null

    const percentDiff = oldValue && newValue && parseFloat(oldValue) !== 0
        ? ((parseFloat(newValue) - parseFloat(oldValue)) / parseFloat(oldValue)) * 100
        : null

    const result5 = baseValue && changePercent
        ? changeType === "increase"
            ? parseFloat(baseValue) * (1 + parseFloat(changePercent) / 100)
            : parseFloat(baseValue) * (1 - parseFloat(changePercent) / 100)
        : null

    return (
        <div className="min-h-screen bg-background text-foreground pb-20 pt-10">
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <Link
                    href="/free-tools"
                    className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Free Tools
                </Link>

                <div className="text-center mb-12 space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                        Percentage Calculator
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        5 powerful calculators in one. Calculate percentages, differences, and changes instantly.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {/* Calculator 1: What is X% of Y? */}
                    <Card className="border-border shadow-sm">
                        <CardHeader className="border-b border-border/50">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Calculator className="h-5 w-5 text-primary" />
                                Find Value
                            </CardTitle>
                            <CardDescription>What is X% of Y?</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="percent1">Percentage (%)</Label>
                                <Input
                                    id="percent1"
                                    type="number"
                                    placeholder="e.g., 25"
                                    value={percent1}
                                    onChange={(e) => setPercent1(e.target.value)}
                                    className="h-12 text-lg"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="value1">Of Value</Label>
                                <Input
                                    id="value1"
                                    type="number"
                                    placeholder="e.g., 200"
                                    value={value1}
                                    onChange={(e) => setValue1(e.target.value)}
                                    className="h-12 text-lg"
                                />
                            </div>
                            {result1 !== null && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20"
                                >
                                    <div className="text-sm text-muted-foreground mb-1">Result</div>
                                    <div className="text-3xl font-bold text-primary tabular-nums">
                                        {result1.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                    </div>
                                </motion.div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Calculator 2: X is what % of Y? */}
                    <Card className="border-border shadow-sm">
                        <CardHeader className="border-b border-border/50">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Calculator className="h-5 w-5 text-primary" />
                                Find Percentage
                            </CardTitle>
                            <CardDescription>X is what % of Y?</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="part">Part (X)</Label>
                                <Input
                                    id="part"
                                    type="number"
                                    placeholder="e.g., 50"
                                    value={part}
                                    onChange={(e) => setPart(e.target.value)}
                                    className="h-12 text-lg"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="whole">Whole (Y)</Label>
                                <Input
                                    id="whole"
                                    type="number"
                                    placeholder="e.g., 200"
                                    value={whole}
                                    onChange={(e) => setWhole(e.target.value)}
                                    className="h-12 text-lg"
                                />
                            </div>
                            {result2 !== null && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20"
                                >
                                    <div className="text-sm text-muted-foreground mb-1">Result</div>
                                    <div className="text-3xl font-bold text-primary tabular-nums">
                                        {result2.toLocaleString(undefined, { maximumFractionDigits: 2 })}%
                                    </div>
                                </motion.div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Calculator 3: X is Y% of what? */}
                    <Card className="border-border shadow-sm">
                        <CardHeader className="border-b border-border/50">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Calculator className="h-5 w-5 text-primary" />
                                Find Original
                            </CardTitle>
                            <CardDescription>X is Y% of what?</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="value3">Value (X)</Label>
                                <Input
                                    id="value3"
                                    type="number"
                                    placeholder="e.g., 50"
                                    value={value3}
                                    onChange={(e) => setValue3(e.target.value)}
                                    className="h-12 text-lg"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="percent3">Percentage (Y%)</Label>
                                <Input
                                    id="percent3"
                                    type="number"
                                    placeholder="e.g., 25"
                                    value={percent3}
                                    onChange={(e) => setPercent3(e.target.value)}
                                    className="h-12 text-lg"
                                />
                            </div>
                            {result3 !== null && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20"
                                >
                                    <div className="text-sm text-muted-foreground mb-1">Result</div>
                                    <div className="text-3xl font-bold text-primary tabular-nums">
                                        {result3.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                    </div>
                                </motion.div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Calculator 4: Percentage Difference */}
                    <Card className="border-border shadow-sm">
                        <CardHeader className="border-b border-border/50">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <TrendingUp className="h-5 w-5 text-primary" />
                                Percentage Difference
                            </CardTitle>
                            <CardDescription>% change between two values</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="oldValue">Original Value</Label>
                                <Input
                                    id="oldValue"
                                    type="number"
                                    placeholder="e.g., 100"
                                    value={oldValue}
                                    onChange={(e) => setOldValue(e.target.value)}
                                    className="h-12 text-lg"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="newValue">New Value</Label>
                                <Input
                                    id="newValue"
                                    type="number"
                                    placeholder="e.g., 150"
                                    value={newValue}
                                    onChange={(e) => setNewValue(e.target.value)}
                                    className="h-12 text-lg"
                                />
                            </div>
                            {percentDiff !== null && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20"
                                >
                                    <div className="text-sm text-muted-foreground mb-1">
                                        {percentDiff >= 0 ? "Increase" : "Decrease"}
                                    </div>
                                    <div className={`text-3xl font-bold tabular-nums flex items-center gap-2 ${percentDiff >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                        {percentDiff >= 0 ? <TrendingUp className="h-6 w-6" /> : <TrendingDown className="h-6 w-6" />}
                                        {Math.abs(percentDiff).toLocaleString(undefined, { maximumFractionDigits: 2 })}%
                                    </div>
                                </motion.div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Calculator 5: Percentage Change */}
                    <Card className="border-border shadow-sm md:col-span-2 lg:col-span-1">
                        <CardHeader className="border-b border-border/50">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Calculator className="h-5 w-5 text-primary" />
                                Percentage Change
                            </CardTitle>
                            <CardDescription>Increase/decrease by %</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="baseValue">Base Value</Label>
                                <Input
                                    id="baseValue"
                                    type="number"
                                    placeholder="e.g., 100"
                                    value={baseValue}
                                    onChange={(e) => setBaseValue(e.target.value)}
                                    className="h-12 text-lg"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="changePercent">Change (%)</Label>
                                <Input
                                    id="changePercent"
                                    type="number"
                                    placeholder="e.g., 10"
                                    value={changePercent}
                                    onChange={(e) => setChangePercent(e.target.value)}
                                    className="h-12 text-lg"
                                />
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setChangeType("increase")}
                                    className={`flex-1 px-4 py-2 rounded-lg border transition-colors ${changeType === "increase"
                                        ? "bg-green-500/10 border-green-500/50 text-green-500"
                                        : "border-border hover:bg-secondary"
                                        }`}
                                >
                                    Increase
                                </button>
                                <button
                                    onClick={() => setChangeType("decrease")}
                                    className={`flex-1 px-4 py-2 rounded-lg border transition-colors ${changeType === "decrease"
                                        ? "bg-red-500/10 border-red-500/50 text-red-500"
                                        : "border-border hover:bg-secondary"
                                        }`}
                                >
                                    Decrease
                                </button>
                            </div>
                            {result5 !== null && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20"
                                >
                                    <div className="text-sm text-muted-foreground mb-1">Result</div>
                                    <div className="text-3xl font-bold text-primary tabular-nums">
                                        {result5.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                    </div>
                                </motion.div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* SEO / FAQ Section */}
                <section className="mt-24 border-t border-border/50 pt-16 max-w-4xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-xl font-semibold mb-2">How do I calculate what percentage one number is of another?</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Use the <strong>"X is what % of Y?"</strong> calculator. For example, to find what percentage 25 is of 100, enter 25 as the part and 100 as the whole. The result will be 25%. The formula is: (Part ÷ Whole) × 100.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-2">What is the difference between percentage change and percentage difference?</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                <strong>Percentage difference</strong> calculates the relative change from an original value to a new value (e.g., from 100 to 150 is a 50% increase). <strong>Percentage change</strong> applies a percentage to a base value to find the result (e.g., increasing 100 by 50% gives you 150).
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-2">How do I calculate percentage increase?</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Use the <strong>"Percentage Difference"</strong> calculator. Enter your original value and new value. If the new value is higher, it will show a percentage increase in green. For example, from 100 to 120 is a 20% increase.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-2">Can I calculate percentage decrease?</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Yes! Use either the <strong>"Percentage Difference"</strong> calculator (which will show a red decrease indicator) or the <strong>"Percentage Change"</strong> calculator and select "Decrease". For example, decreasing 100 by 20% gives you 80.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-2">What is X% of Y?</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Use the <strong>"Find Value"</strong> calculator. Enter the percentage and the value. For example, 25% of 200 is 50. The formula is: (Percentage ÷ 100) × Value. This is useful for calculating discounts, tips, tax, and more.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
