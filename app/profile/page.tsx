"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { User, Bookmark, MessageSquare, Settings, LogOut, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock user data (would come from Firebase Auth in production)
const mockUser = {
  name: "Alex Chen",
  email: "alex@example.com",
  avatar: "",
  joinedDate: "January 2024",
}

// Mock saved tools and comments (would come from database in production)
const savedTools: any[] = []
const userComments = [
  {
    id: "1",
    toolName: "Next.js",
    toolSlug: "nextjs",
    content: "This framework has completely changed how I build web apps!",
    timestamp: "2 days ago",
  },
  {
    id: "2",
    toolName: "Supabase",
    toolSlug: "supabase",
    content: "Great Firebase alternative with better PostgreSQL support.",
    timestamp: "1 week ago",
  },
]

export default function ProfilePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(true)

  if (!isLoggedIn) {
    return (
      <div className="pt-16">
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
          <div className="text-center">
            <h1 className="mb-4 text-2xl font-bold text-foreground">Please Log In</h1>
            <p className="mb-8 text-muted-foreground">
              You need to be logged in to view your profile.
            </p>
            <Link href="/login">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Go to Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-16">
      <div className="mx-auto max-w-4xl px-4 py-12 lg:px-8 lg:py-16">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 rounded-2xl border border-border bg-card p-6 lg:p-8"
        >
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            <Avatar className="h-24 w-24">
              <AvatarImage src={mockUser.avatar || "/placeholder.svg"} />
              <AvatarFallback className="bg-primary/10 text-2xl text-primary">
                {mockUser.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center sm:text-left">
              <h1 className="mb-1 text-2xl font-bold text-foreground">{mockUser.name}</h1>
              <p className="mb-2 text-muted-foreground">{mockUser.email}</p>
              <p className="text-sm text-muted-foreground">Member since {mockUser.joinedDate}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsLoggedIn(false)}
                className="text-destructive hover:bg-destructive/10"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="saved" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-secondary/50">
            <TabsTrigger value="saved" className="data-[state=active]:bg-background">
              <Bookmark className="mr-2 h-4 w-4" />
              Saved Tools ({savedTools.length})
            </TabsTrigger>
            <TabsTrigger value="comments" className="data-[state=active]:bg-background">
              <MessageSquare className="mr-2 h-4 w-4" />
              Comments ({userComments.length})
            </TabsTrigger>
          </TabsList>

          {/* Saved Tools Tab */}
          <TabsContent value="saved">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {savedTools.length > 0 ? (
                savedTools.map((tool) => (
                  <div
                    key={tool.id}
                    className="flex items-center justify-between rounded-xl border border-border bg-card p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-lg font-bold text-primary">
                        {tool.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <Link
                          href={`/tool/${tool.slug}`}
                          className="font-medium text-foreground hover:text-primary"
                        >
                          {tool.name}
                        </Link>
                        <p className="text-sm text-muted-foreground">{tool.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{tool.type}</Badge>
                      <a href={tool.url} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" variant="outline">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-xl border border-border bg-card p-8 text-center">
                  <Bookmark className="mx-auto mb-4 h-8 w-8 text-muted-foreground" />
                  <p className="text-muted-foreground">No saved tools yet.</p>
                  <Link href="/apps">
                    <Button className="mt-4 bg-primary text-primary-foreground">
                      Explore Tools
                    </Button>
                  </Link>
                </div>
              )}
            </motion.div>
          </TabsContent>

          {/* Comments Tab */}
          <TabsContent value="comments">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {userComments.length > 0 ? (
                userComments.map((comment) => (
                  <div
                    key={comment.id}
                    className="rounded-xl border border-border bg-card p-4"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <Link
                        href={`/tool/${comment.toolSlug}`}
                        className="font-medium text-foreground hover:text-primary"
                      >
                        {comment.toolName}
                      </Link>
                      <span className="text-sm text-muted-foreground">{comment.timestamp}</span>
                    </div>
                    <p className="text-muted-foreground">{comment.content}</p>
                  </div>
                ))
              ) : (
                <div className="rounded-xl border border-border bg-card p-8 text-center">
                  <MessageSquare className="mx-auto mb-4 h-8 w-8 text-muted-foreground" />
                  <p className="text-muted-foreground">No comments yet.</p>
                  <Link href="/apps">
                    <Button className="mt-4 bg-primary text-primary-foreground">
                      Explore Tools
                    </Button>
                  </Link>
                </div>
              )}
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
