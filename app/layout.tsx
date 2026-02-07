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
    verification: {
        google: "hlRBJ-UptLUAi0_Qamw24aukNFkWK5Iu3qdu6bXxHg8",
    },
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
                    async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5393537893752961"
                    crossOrigin="anonymous"
                    strategy="afterInteractive"
                />
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-RKB7R57LZQ"
                    strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-RKB7R57LZQ');
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
