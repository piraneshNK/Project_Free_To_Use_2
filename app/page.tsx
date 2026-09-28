import { Metadata } from "next"
import { HomeView } from "@/components/home-view"
import { WebsiteSchema, OrganizationSchema } from "@/components/json-ld"
import { getDirectoryData } from "@/lib/data"

export const revalidate = 300

export const metadata: Metadata = {
  title: "Project Free To Use - Best Free AI Tools, APIs & Open Source",
  description: "Discover the world's best free AI tools, APIs, open source software, and open patents. Curated directory for developers and creators to build faster.",
  openGraph: {
    title: "Project Free To Use - Best Free AI Tools, APIs & Open Source",
    description: "Discover the world's best free AI tools, APIs, open source software, and open patents. Curated directory for developers and creators to build faster.",
    type: "website",
    url: "https://projectfreetouse.com",
  },
  alternates: {
    canonical: "https://projectfreetouse.com",
  }
}

export default async function HomePage() {
  const { tools, counts } = await getDirectoryData()

  return (
    <>
      <WebsiteSchema />
      <OrganizationSchema />
      <HomeView initialTools={tools.slice(0, 8)} counts={counts} />
    </>
  )
}
