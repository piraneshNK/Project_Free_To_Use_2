"use client"

import { useEffect, useState } from "react"
import type { Tool } from "@/lib/types"

const PAGE_SIZE = 200
const EMPTY_TOOLS: Tool[] = []

export function useDirectoryTools(
    directory: "app" | "api" | "open-source" | "patent" | "llm",
    initialTools: Tool[] = EMPTY_TOOLS,
) {
    const [tools, setTools] = useState<Tool[]>(initialTools)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const controller = new AbortController()
        let active = true

        async function loadDirectory() {
            setTools(initialTools)
            setLoading(true)
            let offset = initialTools.length

            try {
                while (active) {
                    const response = await fetch(
                        `/api/tools?directory=${directory}&offset=${offset}&limit=${PAGE_SIZE}`,
                        { signal: controller.signal },
                    )
                    if (!response.ok) throw new Error(`Directory request failed: ${response.status}`)

                    const page: Tool[] = await response.json()
                    if (!active) return

                    setTools((current) => [...current, ...page])
                    offset += page.length
                    if (page.length < PAGE_SIZE) break
                }
            } catch (error) {
                if (active && !controller.signal.aborted) {
                    console.error(`Error loading ${directory} directory:`, error)
                }
            } finally {
                if (active) setLoading(false)
            }
        }

        void loadDirectory()
        return () => {
            active = false
            controller.abort()
        }
    }, [directory, initialTools])

    return { tools, loading }
}