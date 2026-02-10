import FreeToolsClient from "./free-tools-client"
import { Metadata } from "next"
import Script from "next/script"

export const metadata: Metadata = {
    title: "Free Online Calculators & Utilities | Project Free To Use",
    description: "Collection of free online calculators and utilities. Percentage calculator, age calculator, AI subscription calculator, and more. No registration required.",
    keywords: [
        "free online calculators",
        "free utilities",
        "percentage calculator",
        "age calculator",
        "AI calculator",
        "free tools online",
        "calculator collection",
        "online utilities 2026"
    ],
    openGraph: {
        title: "Free Online Calculators & Utilities",
        description: "Collection of free calculators and utilities. Percentage, age, AI subscription calculators and more. No registration required.",
        type: "website",
        url: "https://projectfreetouse.com/free-tools",
        siteName: "Project Free To Use",
    },
    twitter: {
        card: "summary_large_image",
        title: "Free Online Calculators & Utilities",
        description: "Free calculators and utilities. No registration required.",
    },
    alternates: {
        canonical: "https://projectfreetouse.com/free-tools",
    }
}

export default function FreeToolsPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Free Online Calculators & Utilities",
        "description": "Collection of free online calculators and utilities including percentage calculator, age calculator, and AI subscription calculator.",
        "url": "https://projectfreetouse.com/free-tools",
        "hasPart": [
            {
                "@type": "SoftwareApplication",
                "name": "Percentage Calculator",
                "applicationCategory": "UtilitiesApplication",
                "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD"
                },
                "url": "https://projectfreetouse.com/percentage-calculator"
            },
            {
                "@type": "SoftwareApplication",
                "name": "Age Calculator",
                "applicationCategory": "UtilitiesApplication",
                "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD"
                },
                "url": "https://projectfreetouse.com/age-calculator"
            },
            {
                "@type": "SoftwareApplication",
                "name": "AI Overlap & Burn Calculator",
                "applicationCategory": "UtilitiesApplication",
                "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD"
                },
                "url": "https://projectfreetouse.com/ai-overlap-burn-calculator"
            }
        ]
    }

    return (
        <>
            <Script
                id="free-tools-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <FreeToolsClient />
        </>
    )
}
