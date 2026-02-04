import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  metadataBase: new URL('https://projectfreetouse.com'),
  title: {
    default: 'Project Free to Use - Free Apps, APIs & Open Innovation Tools',
    template: '%s | Project Free to Use'
  },
  description: 'Discover free resources to build faster, smarter, and cheaper. Find free apps, APIs, open source projects, and open patents.',
  keywords: ['free apps', 'free APIs', 'open source', 'open patents', 'developer tools', 'AI tools', 'free tools', 'open innovation'],
  authors: [{ name: 'Project Free to Use' }],
  creator: 'Project Free to Use',
  publisher: 'Project Free to Use',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://projectfreetouse.com',
    siteName: 'Project Free to Use',
    title: 'Project Free to Use - Free Apps, APIs & Open Innovation Tools',
    description: 'Discover free resources to build faster, smarter, and cheaper. Find free apps, APIs, open source projects, and open patents.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Project Free to Use',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Project Free to Use - Free Apps, APIs & Open Innovation Tools',
    description: 'Discover free resources to build faster, smarter, and cheaper.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png?v=2',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png?v=2',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.png?v=2',
        type: 'image/png',
      },
    ],
    apple: '/apple-icon.png?v=2',
  },
}

export const viewport: Viewport = {
  themeColor: '#DC2626',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased min-h-screen bg-background text-foreground`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
