"use client"

import * as React from "react"
import { Globe } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { EXCHANGE_RATES, Currency } from "./data"

interface CurrencySelectorProps {
    currentCurrency: Currency
    onCurrencyChange: (currency: Currency) => void
    isAuto: boolean
    onAutoToggle: (enabled: boolean) => void
}

export function CurrencySelector({
    currentCurrency,
    onCurrencyChange,
    isAuto,
    onAutoToggle,
}: CurrencySelectorProps) {
    return (
        <div className="flex items-center gap-2">
            <Select
                value={isAuto ? "AUTO" : currentCurrency}
                onValueChange={(val) => {
                    if (val === "AUTO") {
                        onAutoToggle(true)
                    } else {
                        onAutoToggle(false)
                        onCurrencyChange(val as Currency)
                    }
                }}
            >
                <SelectTrigger className="w-[140px] bg-white/5 border-white/10 backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-muted-foreground" />
                        <SelectValue placeholder="Currency" />
                    </div>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="AUTO">
                        <span className="flex items-center gap-2">
                            ✨ Auto ({currentCurrency})
                        </span>
                    </SelectItem>
                    {Object.keys(EXCHANGE_RATES).map((currency) => (
                        <SelectItem key={currency} value={currency}>
                            {currency}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}
