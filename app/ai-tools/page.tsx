import { DirectoryListing } from "@/components/directory-listing"
import { filterDirectoryTools, getDirectoryConfig, getDirectoryMetadata } from "@/lib/directory-config"
import { getToolsForDirectory } from "@/lib/data"

export const dynamic = "force-dynamic"

const directory = getDirectoryConfig("app")
export const metadata = getDirectoryMetadata(directory)

export default async function AIToolsPage() {
  const tools = await getToolsForDirectory(directory.id)
  return <DirectoryListing directory={directory} tools={filterDirectoryTools(tools, directory)} page={1} />
}
