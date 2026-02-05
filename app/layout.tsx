import type { Metadata } from "next"
import { Outfit } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { Toaster } from "sonner"

const outfit = Outfit({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Project Free To Use - Free AI Tools, APIs & Open Source",
    description: "Discover the best free AI tools, APIs, open source software, and patterns. A curated directory for developers and creators.",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={outfit.className}>
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-YLYQPD9CFX"
                    strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-YLYQPD9CFX');
          `}
                </Script>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem={false}
                    disableTransitionOnChange
                >
                    <Navbar />
                    <main className="min-h-screen">
                        {children}
                    </main>
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    )
}
