"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Copy, Check, Share2, Bookmark } from "lucide-react"
import { toast } from "sonner"

interface ToolActionsProps {
    slug: string
    url: string
}

export function ToolActions({ slug, url }: ToolActionsProps) {
    const [copied, setCopied] = useState(false)
    const [saved, setSaved] = useState(false)

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href)
            setCopied(true)
            toast.success("Link copied to clipboard!")
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            toast.error("Failed to copy link")
        }
    }

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: document.title,
                    url: window.location.href,
                })
            } catch (err) {
                // Ignore abort errors
            }
        } else {
            copyToClipboard()
        }
    }

    const handleSave = () => {
        setSaved(!saved)
        toast.success(saved ? "Removed from saved tools" : "Saved to your library")
    }

    return (
        <div className="flex flex-wrap gap-3">
            <Button
                size="lg"
                className="flex-1 sm:flex-none"
                asChild
            >
                <a href={url} target="_blank" rel="noopener noreferrer">
                    Visit Website
                </a>
            </Button>

            <Button
                variant="outline"
                size="icon"
                onClick={handleSave}
                className={saved ? "text-primary border-primary/50 bg-primary/10" : ""}
            >
                <Bookmark className={`h-5 w-5 ${saved ? "fill-current" : ""}`} />
                <span className="sr-only">Save tool</span>
            </Button>

            <Button variant="outline" size="icon" onClick={handleShare}>
                <Share2 className="h-5 w-5" />
                <span className="sr-only">Share</span>
            </Button>

            <Button variant="outline" size="icon" onClick={copyToClipboard}>
                {copied ? (
                    <Check className="h-5 w-5 text-green-500" />
                ) : (
                    <Copy className="h-5 w-5" />
                )}
                <span className="sr-only">Copy link</span>
            </Button>
        </div>
    )
}
