"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "sonner"
import { Send } from "lucide-react"

interface Comment {
    id: string
    author: string
    avatar?: string
    content: string
    timestamp: number
    date?: string
    tool_slug: string
}

interface CommentsProps {
    toolSlug: string
}

export function Comments({ toolSlug }: CommentsProps) {
    const [comment, setComment] = useState("")
    const [comments, setComments] = useState<Comment[]>([])
    const [loading, setLoading] = useState(false)
    const [userIdentity, setUserIdentity] = useState("Guest User")
    const containerRef = useRef<HTMLDivElement>(null)

    // Initialize user identity from localStorage
    useEffect(() => {
        const storedIdentity = localStorage.getItem("pftu_user_identity")
        if (storedIdentity) {
            setUserIdentity(storedIdentity)
        } else {
            // Generate unique ID: User-XXXXX
            const randomId = Math.random().toString(36).substring(2, 7).toUpperCase()
            const newIdentity = `User-${randomId}`
            localStorage.setItem("pftu_user_identity", newIdentity)
            setUserIdentity(newIdentity)
        }
    }, [])

    // Fetch comments on mount
    useEffect(() => {
        fetchComments()
    }, [toolSlug])

    const fetchComments = async () => {
        setLoading(true)
        try {
            const res = await fetch(`/api/comments?slug=${toolSlug}`)
            if (!res.ok) throw new Error("Failed to fetch")

            const data = await res.json()
            const formattedComments = data.map((c: any) => ({
                id: c._id,
                author: c.author,
                content: c.content,
                avatar: c.avatar || "/placeholder-user.jpg",
                timestamp: c.timestamp,
                date: formatDate(c.timestamp),
                tool_slug: c.tool_slug
            }))
            setComments(formattedComments)
        } catch (error) {
            console.error("Error loading comments:", error)
            toast.error("Failed to load comments")
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async () => {
        if (!comment.trim()) return

        try {
            const newComment = {
                tool_slug: toolSlug,
                author: userIdentity,
                content: comment,
                avatar: "/placeholder-user.jpg",
            }

            const res = await fetch('/api/comments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newComment)
            })

            if (!res.ok) throw new Error("Failed to post")

            // Optimistic update or refetch
            setComment("")
            fetchComments() // Simple refetch to ensure consistency
            toast.success("Comment posted!")
        } catch (error) {
            console.error("Error posting comment:", error)
            toast.error("Failed to post comment")
        }
    }

    const formatDate = (timestamp: number): string => {
        const now = Date.now()
        const diff = now - timestamp

        const minutes = Math.floor(diff / 60000)
        const hours = Math.floor(diff / 3600000)
        const days = Math.floor(diff / 86400000)

        if (minutes < 1) return "Just now"
        if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`
        if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`
        if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`

        return new Date(timestamp).toLocaleDateString()
    }

    return (
        <div ref={containerRef} className="rounded-2xl border border-border bg-card p-6 lg:p-8">
            <h3 className="mb-6 text-xl font-bold text-foreground">
                Comments ({loading ? "..." : comments.length})
            </h3>

            {/* Input */}
            <div className="mb-8 flex gap-4">
                <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>{userIdentity.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-4">
                    <Textarea
                        placeholder="Add a comment..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="min-h-[100px] bg-background"
                    />
                    <div className="flex justify-end">
                        <Button onClick={handleSubmit} disabled={!comment.trim()}>
                            <Send className="mr-2 h-4 w-4" />
                            Post Comment
                        </Button>
                    </div>
                </div>
            </div>

            {/* List */}
            {loading && comments.length === 0 ? (
                <div className="py-8 text-center text-muted-foreground">
                    Loading comments...
                </div>
            ) : comments.length === 0 ? (
                <div className="py-8 text-center text-muted-foreground">
                    No comments yet. Be the first to comment!
                </div>
            ) : (
                <div className="space-y-6">
                    {comments.map((comment) => (
                        <div key={comment.id} className="flex gap-4">
                            <Avatar>
                                <AvatarImage src={comment.avatar} />
                                <AvatarFallback>{comment.author[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold text-foreground">
                                        {comment.author}
                                    </span>
                                    <span className="text-sm text-muted-foreground">
                                        {comment.date}
                                    </span>
                                </div>
                                <p className="mt-1 text-muted-foreground">{comment.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
