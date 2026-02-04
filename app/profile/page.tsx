"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Fingerprint, Copy, User, Lock, Bookmark, Trash2, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { getDeviceInfo } from "@/lib/device-auth"
import { getSavedTools, unsaveTool, type SavedTool } from "@/lib/saved-tools"

export default function ProfilePage() {
  const [deviceId, setDeviceId] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [copied, setCopied] = useState(false)
  const [savedTools, setSavedTools] = useState<SavedTool[]>([])

  useEffect(() => {
    const info = getDeviceInfo()
    setDeviceId(info.deviceId)
    setDisplayName(info.displayName)

    // Load saved tools
    setSavedTools(getSavedTools())
  }, [])

  const handleCopyDeviceId = () => {
    navigator.clipboard.writeText(deviceId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleUnsave = (id: string) => {
    if (confirm('Remove this tool from saved?')) {
      unsaveTool(id)
      setSavedTools(getSavedTools())
    }
  }

  return (
    <div className="pt-16">
      <div className="mx-auto max-w-4xl px-4 py-12 lg:px-8 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Profile</h1>
            <p className="mt-2 text-muted-foreground">
              View your device information
            </p>
          </div>

          {/* Profile Card */}
          <div className="rounded-2xl border border-border bg-card p-6 lg:p-8">
            <div className="flex items-start gap-6">
              {/* Avatar */}
              <Avatar className="h-20 w-20 border-2 border-primary">
                <AvatarFallback className="bg-primary/10 text-2xl font-bold text-primary">
                  {displayName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              {/* Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold text-foreground">{displayName}</h2>
                  <Lock className="h-5 w-5 text-muted-foreground" title="Unchangeable" />
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Display name (permanent)
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="my-6 h-px bg-border" />

            {/* Device ID Section */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <Fingerprint className="h-4 w-4" />
                Device Identification
              </h3>

              <div className="rounded-lg bg-secondary/30 p-4 space-y-3">
                <div>
                  <Label className="text-xs text-muted-foreground">Device ID (Permanent)</Label>
                  <div className="mt-1 flex items-center gap-2">
                    <code className="flex-1 rounded bg-background px-3 py-2 text-xs font-mono text-foreground border border-border overflow-x-auto">
                      {deviceId}
                    </code>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleCopyDeviceId}
                      className="gap-2 shrink-0"
                    >
                      <Copy className="h-3 w-3" />
                      {copied ? "Copied!" : "Copy"}
                    </Button>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    This ID is unique to this device and never changes
                  </p>
                </div>

                <div>
                  <Label className="text-xs text-muted-foreground">Display Name (Permanent)</Label>
                  <div className="mt-1 rounded bg-background px-3 py-2 text-sm font-medium text-foreground border border-border flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    {displayName}
                    <Lock className="ml-auto h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    This name was set during registration and cannot be changed
                  </p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="my-6 h-px bg-border" />

            {/* How It Works */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">How It Works</h3>

              <div className="rounded-lg bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-900/50 p-4">
                <ul className="space-y-2 text-xs text-blue-900 dark:text-blue-300">
                  <li className="flex gap-2">
                    <span className="font-bold min-w-[80px]">Device ID:</span>
                    <span>Unique identifier for this device. Used to track your comments and submissions.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold min-w-[80px]">Display Name:</span>
                    <span>What others see on your comments. Set once during registration.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold min-w-[80px]">Storage:</span>
                    <span>Stored locally in your browser AND in Firebase for backup.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold min-w-[80px]">Permanent:</span>
                    <span>Both values cannot be changed after registration.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Divider */}
            <div className="my-6 h-px bg-border" />

            {/* Saved Tools Section */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <Bookmark className="h-4 w-4" />
                Saved Tools ({savedTools.length})
              </h3>

              {savedTools.length === 0 ? (
                <div className="rounded-lg border border-dashed border-border bg-secondary/20 p-8 text-center">
                  <Bookmark className="mx-auto mb-3 h-12 w-12 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    No saved tools yet. Click the "Save" button on any tool page to save it here!
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {savedTools.map((tool) => (
                    <div
                      key={tool.id}
                      className="flex items-center justify-between rounded-lg border border-border bg-card p-3 hover:bg-secondary/50 transition-colors"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <Bookmark className="h-4 w-4 text-primary" />
                        <div className="flex-1">
                          <Link
                            href={`/tool/${tool.slug}`}
                            className="font-medium text-foreground hover:text-primary transition-colors"
                          >
                            {tool.name}
                          </Link>
                          <p className="text-xs text-muted-foreground">
                            Saved {new Date(tool.savedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Link href={`/tool/${tool.slug}`}>
                          <Button size="sm" variant="ghost" className="gap-2">
                            <ExternalLink className="h-3 w-3" />
                            View
                          </Button>
                        </Link>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleUnsave(tool.id)}
                          className="text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-6 rounded-lg bg-secondary/30 p-4">
            <h4 className="mb-2 font-semibold text-sm text-foreground">Privacy & Data</h4>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li>• Your Device ID is used to track your contributions (submissions, comments)</li>
              <li>• Your Display Name appears publicly on your posts</li>
              <li>• Both are stored in your browser AND Firebase for persistence</li>
              <li>• Neither can be changed after initial registration</li>
              <li>• Clearing browser data will require re-registration with a new Device ID</li>
              <li>• Comments are moderated for profanity and inappropriate content</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
