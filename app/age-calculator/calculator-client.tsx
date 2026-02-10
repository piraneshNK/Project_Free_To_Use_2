
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, Cake } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"

export default function AgeCalculatorClient() {
    const [birthDate, setBirthDate] = useState("")
    const [age, setAge] = useState<{
        years: number;
        months: number;
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
    } | null>(null)
    const [nextBirthday, setNextBirthday] = useState<{
        months: number;
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
    } | null>(null)

    useEffect(() => {
        if (!birthDate) return

        const calculate = () => {
            // Append T00:00:00 to ensure local time interpretation if only date is provided
            const birthString = birthDate.includes('T') ? birthDate : `${birthDate}T00:00:00`
            const birth = new Date(birthString)
            const now = new Date()

            // Age calculation
            let years = now.getFullYear() - birth.getFullYear()
            let months = now.getMonth() - birth.getMonth()
            let days = now.getDate() - birth.getDate()
            let hours = now.getHours() - birth.getHours()
            let minutes = now.getMinutes() - birth.getMinutes()
            let seconds = now.getSeconds() - birth.getSeconds()

            if (seconds < 0) {
                minutes--
                seconds += 60
            }
            if (minutes < 0) {
                hours--
                minutes += 60
            }
            if (hours < 0) {
                days--
                hours += 24
            }
            if (days < 0) {
                months--
                const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate()
                days += prevMonth
            }
            if (months < 0) {
                years--
                months += 12
            }

            setAge({ years, months, days, hours, minutes, seconds })

            // Next birthday calculation
            const nextBday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate(), birth.getHours(), birth.getMinutes(), birth.getSeconds())
            if (now > nextBday) {
                nextBday.setFullYear(now.getFullYear() + 1)
            }

            // Calculate difference
            let nbMonths = nextBday.getMonth() - now.getMonth()
            let nbDays = nextBday.getDate() - now.getDate()
            let nbHours = nextBday.getHours() - now.getHours()
            let nbMinutes = nextBday.getMinutes() - now.getMinutes()
            let nbSeconds = nextBday.getSeconds() - now.getSeconds()

            if (nbSeconds < 0) {
                nbMinutes--
                nbSeconds += 60
            }
            if (nbMinutes < 0) {
                nbHours--
                nbMinutes += 60
            }
            if (nbHours < 0) {
                nbDays--
                nbHours += 24
            }
            if (nbDays < 0) {
                nbMonths--
                const prevMonthDate = new Date(nextBday.getFullYear(), nextBday.getMonth(), 0)
                nbDays += prevMonthDate.getDate()
            }
            if (nbMonths < 0) {
                nbMonths += 12
            }

            setNextBirthday({
                months: nbMonths,
                days: nbDays,
                hours: nbHours,
                minutes: nbMinutes,
                seconds: nbSeconds
            })
        }

        calculate()
        const timer = setInterval(calculate, 1000)

        return () => clearInterval(timer)
    }, [birthDate])

    return (
        <div className="min-h-screen bg-background text-foreground pb-20 pt-10">
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <Link
                    href="/free-tools"
                    className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Free Tools
                </Link>

                <div className="text-center mb-12 space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                        Age Calculator
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Precision tracking of your biological age down to the second.
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-12">
                    <Card className="lg:col-span-5 border-border shadow-sm h-fit">
                        <CardHeader>
                            <CardTitle>Date of Birth</CardTitle>
                            <CardDescription>Select your birth date to begin tracking.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="birthdate">Born On</Label>
                                <Input
                                    id="birthdate"
                                    type="date"
                                    value={birthDate}
                                    onChange={(e) => setBirthDate(e.target.value)}
                                    className="h-12 text-lg px-4"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <div className="lg:col-span-7 space-y-6">
                        {age ? (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-6"
                            >
                                <Card className="border-primary/20 shadow-md bg-gradient-to-br from-background to-secondary/20">
                                    <CardHeader className="pb-2 border-b border-border/50">
                                        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Current Age</CardTitle>
                                    </CardHeader>
                                    <CardContent className="pt-6">
                                        <div className="flex flex-col gap-6">
                                            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                                                <div className="flex items-baseline gap-1">
                                                    <span className="text-5xl md:text-6xl font-extrabold text-primary tracking-tight tabular-nums">{age.years}</span>
                                                    <span className="text-lg md:text-xl font-medium text-muted-foreground">yrs</span>
                                                </div>
                                                <div className="flex items-baseline gap-1">
                                                    <span className="text-3xl md:text-4xl font-bold text-foreground tabular-nums">{age.months}</span>
                                                    <span className="text-base md:text-lg text-muted-foreground">mos</span>
                                                </div>
                                                <div className="flex items-baseline gap-1">
                                                    <span className="text-3xl md:text-4xl font-bold text-foreground tabular-nums">{age.days}</span>
                                                    <span className="text-base md:text-lg text-muted-foreground">days</span>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-3 gap-4 border-t border-border/50 pt-4">
                                                <div className="text-center p-3 rounded-lg bg-background/50 border border-border/50">
                                                    <div className="text-2xl font-bold text-foreground tabular-nums">{age.hours.toString().padStart(2, '0')}</div>
                                                    <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">Hours</div>
                                                </div>
                                                <div className="text-center p-3 rounded-lg bg-background/50 border border-border/50">
                                                    <div className="text-2xl font-bold text-foreground tabular-nums">{age.minutes.toString().padStart(2, '0')}</div>
                                                    <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">Mins</div>
                                                </div>
                                                <div className="text-center p-3 rounded-lg bg-background/50 border border-border/50">
                                                    <div className="text-2xl font-bold text-primary tabular-nums">{age.seconds.toString().padStart(2, '0')}</div>
                                                    <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">Secs</div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {nextBirthday && (
                                    <Card className="shadow-sm">
                                        <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0 border-b border-border/50">
                                            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Next Birthday</CardTitle>
                                            <Cake className="h-5 w-5 text-primary/80" />
                                        </CardHeader>
                                        <CardContent className="pt-4">
                                            <div className="space-y-4">
                                                <div className="text-3xl font-bold tracking-tight">
                                                    {nextBirthday.months > 0 && <span className="tabular-nums">{nextBirthday.months} <span className="text-lg font-normal text-muted-foreground mr-2">mos</span></span>}
                                                    <span className="tabular-nums">{nextBirthday.days} <span className="text-lg font-normal text-muted-foreground">days</span></span>
                                                </div>
                                                <div className="flex gap-4 text-sm font-medium text-muted-foreground bg-secondary/30 p-3 rounded-md w-fit">
                                                    <span className="tabular-nums"><span className="text-foreground font-bold">{nextBirthday.hours.toString().padStart(2, '0')}</span> h</span>
                                                    <span className="text-border">|</span>
                                                    <span className="tabular-nums"><span className="text-foreground font-bold">{nextBirthday.minutes.toString().padStart(2, '0')}</span> m</span>
                                                    <span className="text-border">|</span>
                                                    <span className="tabular-nums"><span className="text-foreground font-bold">{nextBirthday.seconds.toString().padStart(2, '0')}</span> s</span>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}
                            </motion.div>
                        ) : (
                            <div className="h-full min-h-[300px] flex flex-col items-center justify-center p-8 border-2 border-dashed border-muted-foreground/20 rounded-xl bg-muted/5 text-center">
                                <div className="bg-background p-4 rounded-full shadow-sm mb-4">
                                    <Calendar className="h-8 w-8 text-primary" />
                                </div>
                                <h3 className="text-lg font-semibold text-foreground mb-2">Waiting for Input</h3>
                                <p className="text-muted-foreground max-w-xs">
                                    Select your date of birth on the left to reveal your precise age metrics.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
