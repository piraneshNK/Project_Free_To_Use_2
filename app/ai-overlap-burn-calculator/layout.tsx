import type { Metadata } from "next"

const title = "AI Subscription Cost Calculator | Compare AI Tool Costs"
const description = "Compare monthly AI subscription costs, spot overlapping capabilities, and review ways to optimize your AI spending with this free calculator."

export const metadata: Metadata = {
    title,
    description,
    keywords: [
        "AI subscription calculator",
        "AI cost calculator",
        "AI subscription cost comparison",
        "AI spending calculator",
        "AI tool overlap checker",
        "AI subscription savings calculator",
        "ChatGPT Claude Gemini cost comparison",
    ],
    alternates: {
        canonical: "https://projectfreetouse.com/ai-overlap-burn-calculator",
    },
    robots: {
        index: true,
        follow: true,
    },
    openGraph: {
        title,
        description,
        type: "website",
        url: "https://projectfreetouse.com/ai-overlap-burn-calculator",
        siteName: "Project Free To Use",
    },
    twitter: {
        card: "summary_large_image",
        title,
        description,
    },
}

export default function AICalculatorLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return children
}