"use client"

interface JsonLdProps {
  data: Record<string, unknown>
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

// WebSite Schema for Homepage
export function WebsiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ProjectFreeToUse",
    url: "https://projectfreetouse.com",
    description: "Discover the best free AI tools, APIs, open source software, and open patents. Your curated hub for free developer resources.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://projectfreetouse.com/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  }
  return <JsonLd data={schema} />
}

// Organization Schema
export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ProjectFreeToUse",
    url: "https://projectfreetouse.com",
    logo: "https://projectfreetouse.com/logo.png",
    sameAs: [
      "https://twitter.com/projectfreetouse",
      "https://github.com/projectfreetouse",
      "https://linkedin.com/company/projectfreetouse"
    ]
  }
  return <JsonLd data={schema} />
}

// SoftwareApplication Schema for Tools
export function SoftwareApplicationSchema({ 
  name, 
  description, 
  url, 
  category,
  applicationCategory,
  offers
}: {
  name: string
  description: string
  url: string
  category: string
  applicationCategory?: string
  offers?: { price: string; priceCurrency: string }
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    url,
    applicationCategory: applicationCategory || category,
    offers: offers || {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    },
    operatingSystem: "Web"
  }
  return <JsonLd data={schema} />
}

// FAQ Schema
export function FAQSchema({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  }
  return <JsonLd data={schema} />
}

// Breadcrumb Schema
export function BreadcrumbSchema({ 
  items 
}: { 
  items: { name: string; url: string }[] 
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }
  return <JsonLd data={schema} />
}

// ItemList Schema for Directory Pages
export function ItemListSchema({ 
  name,
  description,
  items 
}: { 
  name: string
  description: string
  items: { name: string; url: string; description: string }[] 
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    description,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SoftwareApplication",
        name: item.name,
        url: item.url,
        description: item.description
      }
    }))
  }
  return <JsonLd data={schema} />
}
