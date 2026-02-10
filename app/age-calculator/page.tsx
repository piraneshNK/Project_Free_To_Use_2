
import AgeCalculatorClient from "./calculator-client"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Free Age Calculator | Exact Age in Years, Months, Days & Seconds",
    description: "Calculate your exact age in years, months, days, hours, minutes, and seconds. Free online age calculator with next birthday countdown. Completely distinct from simple year calculators.",
    keywords: [
        "age calculator",
        "calculate age",
        "exact age calculator",
        "birthday countdown",
        "chronological age",
        "date of birth calculator",
        "age in seconds",
        "how old am i",
        "age calculator by date of birth"
    ],
    openGraph: {
        title: "Free Age Calculator | Exact Age Down to the Second",
        description: "Discover exactly how old you are in years, months, days, hours, minutes, and seconds. Includes a live next birthday countdown.",
        type: "website",
        // url: "https://your-domain.com/age-calculator", // Ideally replace with actual URL
    },
    twitter: {
        card: "summary_large_image",
        title: "Free Age Calculator | Exact Age & Birthday Countdown",
        description: "Calculate your precise age instantly. See years, months, days, hours, minutes, and seconds ticking by.",
    }
}

export default function AgeCalculatorPage() {
    return <AgeCalculatorClient />
}
