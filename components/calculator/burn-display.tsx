"use client"

import { motion } from "framer-motion"
import { Currency } from "./data"

interface BurnDisplayProps {
    monthlyCost: number
    currency: Currency
    rate: number
}

export function BurnDisplay({ monthlyCost, currency, rate }: BurnDisplayProps) {
    const convertedMonthly = monthlyCost * rate
    const convertedAnnual = convertedMonthly * 12

    const formatMoney = (amount: number, curr: string) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: curr,
            maximumFractionDigits: 0,
        }).format(amount)
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-2xl p-6 backdrop-blur-xl"
        >
            <h2 className="text-xl font-semibold mb-4 text-center">Total Monthly Burn</h2>

            {currency === 'USD' ? (
                <div className="flex flex-col justify-center items-center">
                    <div className="text-center">
                        <p className="text-sm text-muted-foreground uppercase tracking-wider">USD</p>
                        <p className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-500">
                            ${monthlyCost}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">${monthlyCost * 12}/yr</p>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col md:flex-row justify-center items-center gap-8">
                    {/* USD Column */}
                    <div className="text-center">
                        <p className="text-sm text-muted-foreground uppercase tracking-wider">USD</p>
                        <p className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-500">
                            ${monthlyCost}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">${monthlyCost * 12}/yr</p>
                    </div>

                    <div className="h-12 w-px bg-border hidden md:block" />

                    {/* Local Currency Column */}
                    <div className="text-center">
                        <p className="text-sm text-muted-foreground uppercase tracking-wider">{currency}</p>
                        <p className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-yellow-500">
                            {formatMoney(convertedMonthly, currency)}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">{formatMoney(convertedAnnual, currency)}/yr</p>
                    </div>
                </div>
            )}
        </motion.div>
    )
}
