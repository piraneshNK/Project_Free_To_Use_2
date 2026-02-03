"use client"

import React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, Send, User, ThumbsUp, Flag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Comment {
  id: string
  author: string
  avatar?: string
  content: string
  timestamp: string
  likes: number
}

// Sample comments (in production, these would come from Firebase)
const sampleComments: Comment[] = [
  {
    id: "1",
    author: "Alex Chen",
    content: "This tool has been incredibly helpful for my projects. Highly recommend!",
    timestamp: "2 hours ago",
    likes: 12,
  },
  {
    id: "2",
    author: "Sarah Miller",
    content: "Great free alternative. The documentation could be better, but overall a solid choice.",
    timestamp: "1 day ago",
    likes: 8,
  },
  {
    id: "3",
    author: "Mike Johnson",
    content: "Been using this for months. The recent updates have made it even better.",
    timestamp: "3 days ago",
    likes: 5,
  },
]

interface CommentsProps {
  toolSlug: string
}

export function Comments({ toolSlug }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>(sampleComments)
  const [newComment, setNewComment] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    // In production, this would be a Firebase write
    const comment: Comment = {
      id: Date.now().toString(),
      author: "You",
      content: newComment,
      timestamp: "Just now",
      likes: 0,
    }

    setComments([comment, ...comments])
    setNewComment("")
  }

  const handleLike = (commentId: string) => {
    setComments(
      comments.map((c) =>
        c.id === commentId ? { ...c, likes: c.likes + 1 } : c
      )
    )
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="mb-6 flex items-center gap-2">
        <MessageSquare className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold text-foreground">Comments</h2>
        <span className="ml-auto text-sm text-muted-foreground">
          {comments.length} {comments.length === 1 ? "comment" : "comments"}
        </span>
      </div>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-8">
        <Textarea
          placeholder={isLoggedIn ? "Share your thoughts..." : "Login to leave a comment..."}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="mb-3 min-h-[100px] resize-none border-border bg-secondary/30"
          disabled={!isLoggedIn}
        />
        <div className="flex items-center justify-between">
          {!isLoggedIn && (
            <p className="text-sm text-muted-foreground">
              <button
                type="button"
                onClick={() => setIsLoggedIn(true)}
                className="text-primary hover:underline"
              >
                Sign in
              </button>
              {" "}to leave a comment
            </p>
          )}
          <Button
            type="submit"
            disabled={!newComment.trim() || !isLoggedIn}
            className="ml-auto bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Send className="mr-2 h-4 w-4" />
            Post Comment
          </Button>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-6">
        <AnimatePresence>
          {comments.map((comment, index) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.05 }}
              className="border-b border-border pb-6 last:border-0"
            >
              <div className="mb-3 flex items-start gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={comment.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-secondary text-foreground">
                    {comment.author.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">{comment.author}</span>
                    <span className="text-sm text-muted-foreground">{comment.timestamp}</span>
                  </div>
                  <p className="mt-2 text-muted-foreground">{comment.content}</p>
                </div>
              </div>
              <div className="ml-13 flex items-center gap-4">
                <button
                  onClick={() => handleLike(comment.id)}
                  className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <ThumbsUp className="h-4 w-4" />
                  {comment.likes}
                </button>
                <button className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-destructive">
                  <Flag className="h-4 w-4" />
                  Report
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {comments.length === 0 && (
        <div className="py-8 text-center">
          <p className="text-muted-foreground">No comments yet. Be the first to share your thoughts!</p>
        </div>
      )}
    </div>
  )
}
