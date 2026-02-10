import PercentageCalculatorClient from "./percentage-calculator-client"
import { Metadata } from "next"
import Script from "next/script"

export const metadata: Metadata = {
    title: "Free Percentage Calculator | 5 Calculators in One - Project Free To Use",
    description: "All-in-one percentage calculator with 5 calculation modes. Calculate percentages, find values, percentage difference, percentage increase/decrease, and percentage change. Free, fast, and accurate.",
    keywords: [
        "percentage calculator",
        "percent calculator",
        "percentage change calculator",
        "percentage difference calculator",
        "calculate percentage",
        "what is percentage of",
        "percentage increase calculator",
        "percentage decrease calculator",
        "find percentage",
        "percentage formula calculator",
        "online percentage calculator",
        "free percentage calculator 2026"
    ],
    openGraph: {
        title: "Free Percentage Calculator | 5 Calculators in One",
        description: "Calculate percentages instantly with 5 powerful calculators. Find values, percentages, differences, and changes. Completely free.",
        type: "website",
        url: "https://projectfreetouse.com/percentage-calculator",
        siteName: "Project Free To Use",
    },
    twitter: {
        card: "summary_large_image",
        title: "Free Percentage Calculator | 5 Calculators in One",
        description: "All-in-one percentage calculator with 5 calculation modes. Free and instant results.",
    },
    alternates: {
        canonical: "https://projectfreetouse.com/percentage-calculator",
    }
}

export default function PercentageCalculatorPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Percentage Calculator",
        "applicationCategory": "UtilitiesApplication",
        "operatingSystem": "Web",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
        },
        "description": "All-in-one percentage calculator with 5 calculation modes: find value (what is X% of Y?), find percentage (X is what % of Y?), find original (X is Y% of what?), percentage difference, and percentage change.",
        "url": "https://projectfreetouse.com/percentage-calculator",
        "keywords": [
            "percentage calculator",
            "percent calculator",
            "percentage change calculator",
            "percentage difference calculator",
            "calculate percentage online",
            "percentage increase calculator",
            "percentage decrease calculator",
            "free percentage calculator"
        ],
        "featureList": [
            "Calculate what is X% of Y",
            "Find what percentage X is of Y",
            "Calculate X is Y% of what",
            "Percentage difference between two values",
            "Percentage increase and decrease calculator"
        ]
    }

    return (
        <>
            <Script
                id="percentage-calculator-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <PercentageCalculatorClient />
        </>
    )
}
