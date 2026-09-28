import PercentageCalculatorClient from "./percentage-calculator-client"
import { Metadata } from "next"
import Script from "next/script"

export const metadata: Metadata = {
    title: "Percentage Calculator: Free 5-in-1 Online Tool",
    description: "Calculate what percent one number is of another, find a percentage of a value, and work out percentage increases, decreases, and change with five free calculators.",
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
        "free percentage calculator",
        "what percentage is x of y",
        "percentage of a number calculator"
    ],
    openGraph: {
        title: "Percentage Calculator: Free 5-in-1 Online Tool",
        description: "Calculate percentages, increases, decreases, and percentage change with five free online calculators.",
        type: "website",
        url: "https://projectfreetouse.com/percentage-calculator",
        siteName: "Project Free To Use",
    },
    twitter: {
        card: "summary_large_image",
        title: "Percentage Calculator: Free 5-in-1 Online Tool",
        description: "Calculate percentages, increases, decreases, and percentage change instantly.",
    },
    alternates: {
        canonical: "https://projectfreetouse.com/percentage-calculator",
    }
}

export default function PercentageCalculatorPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "SoftwareApplication",
                "name": "Free Percentage Calculator",
                "applicationCategory": "UtilitiesApplication",
                "operatingSystem": "Web",
                "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD",
                },
                "description": "Free online percentage calculator with five modes for calculating a percentage of a value, finding what percent one number is of another, reversing a percentage, and calculating percentage change.",
                "url": "https://projectfreetouse.com/percentage-calculator",
                "featureList": [
                    "Calculate what is X% of Y",
                    "Find what percentage X is of Y",
                    "Calculate X is Y% of what",
                    "Calculate percentage change between two values",
                    "Calculate percentage increase and decrease",
                ],
            },
            {
                "@type": "FAQPage",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "How do I calculate what percentage one number is of another?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Divide the part by the whole and multiply by 100. For example, 25 is 25% of 100. Enter both values in the Find Percentage calculator to get the result.",
                        },
                    },
                    {
                        "@type": "Question",
                        "name": "How do I calculate percentage increase?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Enter the original and new values in the Percentage Difference calculator. It calculates the relative change as (new value minus original value) divided by the original value, multiplied by 100.",
                        },
                    },
                    {
                        "@type": "Question",
                        "name": "Can I calculate a percentage decrease?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes. Compare the original and new values in Percentage Difference, or enter a base value and percentage in Percentage Change and select Decrease.",
                        },
                    },
                ],
            },
        ],
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
