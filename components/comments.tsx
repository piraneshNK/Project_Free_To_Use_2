"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"
import type { RealtimeChannel } from "@supabase/supabase-js"

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
    const [isConnected, setIsConnected] = useState(false)
    const [userIdentity, setUserIdentity] = useState("Guest User")
    const containerRef = useRef<HTMLDivElement>(null)
    const channelRef = useRef<RealtimeChannel | null>(null)

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

    // Load comments immediately on mount
    useEffect(() => {
        connectToSupabase()

        return () => {
            disconnectFromSupabase()
        }
    }, [toolSlug])

    const connectToSupabase = async () => {
        setLoading(true)
        setIsConnected(true)

        try {
            // 1. Fetch existing comments
            const { data, error } = await supabase
                .from('comments')
                .select('*')
                .eq('tool_slug', toolSlug)
                .order('created_at', { ascending: false })

            if (error) throw error

            const loadedComments = (data || []).map(transformSupabaseComment)
            setComments(loadedComments)

            // 2. Subscribe to new comments
            // Only subscribe if not already subscribed
            if (!channelRef.current) {
                const channel = supabase
                    .channel(`comments-${toolSlug}`)
                    .on(
                        'postgres_changes',
                        {
                            event: 'INSERT',
                            schema: 'public',
                            table: 'comments',
                            filter: `tool_slug=eq.${toolSlug}`
                        },
                        (payload) => {
                            const newComment = transformSupabaseComment(payload.new)
                            setComments((prev) => [newComment, ...prev])
                        }
                    )
                    .subscribe()

                channelRef.current = channel
            }

        } catch (error) {
            console.error("Error loading comments:", error)
            toast.error("Failed to load comments")
        } finally {
            setLoading(false)
        }
    }

    const disconnectFromSupabase = () => {
        if (channelRef.current) {
            supabase.removeChannel(channelRef.current)
            channelRef.current = null
        }
        setIsConnected(false)
    }

    const transformSupabaseComment = (record: any): Comment => {
        const timestamp = new Date(record.created_at).getTime()
        return {
            id: record.id.toString(),
            author: record.author,
            content: record.content,
            avatar: record.avatar || "/placeholder-user.jpg",
            timestamp: timestamp,
            date: formatDate(timestamp),
            tool_slug: record.tool_slug
        }
    }

    const handleSubmit = async () => {
        if (!comment.trim()) return

        // Ensure we're connected
        if (!isConnected) {
            connectToSupabase()
        }

        try {
            const { error } = await supabase
                .from('comments')
                .insert([
                    {
                        tool_slug: toolSlug,
                        author: userIdentity,
                        content: comment,
                        avatar: "/placeholder-user.jpg",
                        // created_at is automatic
                    }
                ])

            if (error) throw error

            setComment("")
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
