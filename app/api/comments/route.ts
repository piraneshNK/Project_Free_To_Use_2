import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')

    if (!slug) {
        return NextResponse.json({ error: 'Slug is required' }, { status: 400 })
    }

    try {
        const client = await clientPromise
        const db = client.db('project_freetouse')

        const comments = await db
            .collection('comments')
            .find({ tool_slug: slug })
            .sort({ timestamp: -1 }) // Newest first
            .toArray()

        return NextResponse.json(comments)
    } catch (e) {
        console.error(e)
        return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { tool_slug, author, content, avatar } = body

        if (!tool_slug || !author || !content) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        const client = await clientPromise
        const db = client.db('project_freetouse')

        const newComment = {
            tool_slug,
            author,
            content,
            avatar,
            timestamp: Date.now(),
            created_at: new Date(),
        }

        const result = await db.collection('comments').insertOne(newComment)

        return NextResponse.json({ ...newComment, _id: result.insertedId })
    } catch (e) {
        console.error(e)
        return NextResponse.json({ error: 'Failed to post comment' }, { status: 500 })
    }
}
