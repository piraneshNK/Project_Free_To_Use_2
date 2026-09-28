
import AgeCalculatorClient from "./calculator-client"
import { Metadata } from "next"
import Script from "next/script"

const faqs = [
    {
        question: "How do I calculate my exact age?",
        answer: "Enter your date of birth in the age calculator. It compares your birth date with today's date and shows your age in years, months, days, hours, minutes, and seconds.",
    },
    {
        question: "Can I calculate my age from my date of birth?",
        answer: "Yes. Select your date of birth and the calculator will calculate your current age and the time remaining until your next birthday.",
    },
    {
        question: "Does the age calculator show a birthday countdown?",
        answer: "Yes. After you enter a birth date, the page displays a live countdown to your next birthday in months, days, hours, minutes, and seconds.",
    },
]

export const metadata: Metadata = {
    title: "Age Calculator: Exact Age & Birthday Countdown",
    description: "Use this free age calculator to calculate your exact age from your date of birth in years, months, days, hours, minutes, and seconds, with a live birthday countdown.",
    keywords: [
        "age calculator",
        "date of birth calculator",
        "calculate age from date of birth",
        "exact age calculator",
        "how old am I calculator",
        "age in years months and days",
        "age in seconds",
        "birthday countdown calculator",
        "next birthday calculator"
    ],
    openGraph: {
        title: "Age Calculator: Exact Age & Birthday Countdown",
        description: "Calculate your age from your date of birth and see a live countdown to your next birthday.",
        type: "website",
        url: "https://projectfreetouse.com/age-calculator",
        siteName: "Project Free To Use",
    },
    twitter: {
        card: "summary_large_image",
        title: "Age Calculator: Exact Age & Birthday Countdown",
        description: "Calculate your age from your date of birth in years, months, days, and more.",
    },
    alternates: {
        canonical: "https://projectfreetouse.com/age-calculator",
    },
}

export default function AgeCalculatorPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "SoftwareApplication",
                name: "Free Age Calculator",
                applicationCategory: "UtilitiesApplication",
                operatingSystem: "Web",
                url: "https://projectfreetouse.com/age-calculator",
                description: "Calculate exact age from a date of birth and see a live countdown to the next birthday.",
                offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
                featureList: [
                    "Age in years, months, and days",
                    "Age in hours, minutes, and seconds",
                    "Live countdown to the next birthday",
                ],
            },
            {
                "@type": "FAQPage",
                mainEntity: faqs.map(({ question, answer }) => ({
                    "@type": "Question",
                    name: question,
                    acceptedAnswer: { "@type": "Answer", text: answer },
                })),
            },
        ],
    }

    return (
        <>
            <Script
                id="age-calculator-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <AgeCalculatorClient />
            <section className="container mx-auto max-w-4xl space-y-6 px-4 pb-16 text-foreground">
                <h2 className="text-2xl font-bold">Calculate your exact age from your date of birth</h2>
                <p className="text-muted-foreground leading-relaxed">
                    Enter a birth date to calculate your age in years, months, days, hours, minutes, and seconds. The age calculator also shows how long remains until your next birthday. Your results update while the page is open.
                </p>
                <div className="space-y-5">
                    {faqs.map(({ question, answer }) => (
                        <div key={question}>
                            <h3 className="font-semibold">{question}</h3>
                            <p className="mt-1 text-muted-foreground">{answer}</p>
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}
