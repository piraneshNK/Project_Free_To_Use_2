"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send } from "lucide-react"
import { database } from "@/lib/firebase"
import { ref, push, onValue, off } from "firebase/database"
import { toast } from "sonner"

interface Comment {
    id: string
    author: string
    avatar?: string
    content: string
    timestamp: number
    date?: string
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
    const commentsRef = useRef(ref(database, `comments/${toolSlug}`))

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

    // Lazy load comments only when section becomes visible
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !isConnected) {
                        // User scrolled to comments section - connect to Firebase
                        connectToFirebase()
                    } else if (!entry.isIntersecting && isConnected) {
                        // User scrolled away - disconnect to save connections
                        disconnectFromFirebase()
                    }
                })
            },
            { threshold: 0.1, rootMargin: "50px" }
        )

        if (containerRef.current) {
            observer.observe(containerRef.current)
        }

        return () => {
            observer.disconnect()
            disconnectFromFirebase()
        }
    }, [isConnected])

    const connectToFirebase = () => {
        setLoading(true)
        setIsConnected(true)

        onValue(
            commentsRef.current,
            (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val()
                    const commentsArray: Comment[] = Object.entries(data).map(
                        ([id, value]: [string, any]) => ({
                            id,
                            author: value.author || "Guest User",
                            content: value.content,
                            timestamp: value.timestamp,
                            date: formatDate(value.timestamp),
                            avatar: value.avatar || "/placeholder-user.jpg",
                        })
                    )

                    // Sort by newest first
                    commentsArray.sort((a, b) => b.timestamp - a.timestamp)
                    setComments(commentsArray)
                } else {
                    setComments([])
                }
                setLoading(false)
            },
            (error) => {
                console.error("Error fetching comments:", error)
                toast.error("Failed to load comments")
                setLoading(false)
            }
        )
    }

    const disconnectFromFirebase = () => {
        if (isConnected) {
            off(commentsRef.current)
            setIsConnected(false)
        }
    }

    const handleSubmit = async () => {
        if (!comment.trim()) return

        // Ensure we're connected before posting
        if (!isConnected) {
            connectToFirebase()
        }

        try {
            await push(commentsRef.current, {
                author: userIdentity,
                content: comment,
                timestamp: Date.now(),
                avatar: "/placeholder-user.jpg",
            })

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
            {!isConnected ? (
                <div className="py-8 text-center text-muted-foreground">
                    Scroll down to load comments...
                </div>
            ) : loading ? (
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
