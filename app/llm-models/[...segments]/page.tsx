import { notFound } from "next/navigation"
import { DirectoryListing } from "@/components/directory-listing"
import {
  filterDirectoryTools,
  getDirectoryConfig,
  getDirectoryMetadata,
  parseDirectorySegments,
} from "@/lib/directory-config"
import { getToolsForDirectory } from "@/lib/data"

export const dynamic = "force-dynamic"
const directory = getDirectoryConfig("llm")

interface PageProps {
  params: Promise<{ segments: string[] }>
}

export async function generateMetadata({ params }: PageProps) {
  const parsed = parseDirectorySegments((await params).segments)
  return parsed ? getDirectoryMetadata(directory, parsed.page, parsed.categoryId) : {}
}

export default async function LLMModelsSubpage({ params }: PageProps) {
  const parsed = parseDirectorySegments((await params).segments)
  if (!parsed) notFound()
  const tools = filterDirectoryTools(await getToolsForDirectory(directory.id), directory, parsed.categoryId)
  return <DirectoryListing {...parsed} directory={directory} tools={tools} />
}
