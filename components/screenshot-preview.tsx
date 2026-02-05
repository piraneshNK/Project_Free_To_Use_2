"use client"

import { useState } from "react"
import { ImageOff } from "lucide-react"

interface ScreenshotPreviewProps {
    url: string
    name: string
}

export function ScreenshotPreview({ url, name }: ScreenshotPreviewProps) {
    const [error, setError] = useState(false)

    if (error) {
        return (
            <div className="flex h-full w-full flex-col items-center justify-center bg-muted/30 text-muted-foreground">
                <ImageOff className="mb-2 h-8 w-8 opacity-50" />
                <p className="text-sm">Preview not available</p>
            </div>
        )
    }

    return (
        <img
            src={`https://image.thum.io/get/width/1200/crop/800/noanimate/${url}`}
            alt={`${name} preview`}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            loading="lazy"
            onError={() => setError(true)}
        />
    )
}
