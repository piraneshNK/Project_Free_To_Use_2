import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { name, url, type, category, description, isFree, email } = body

        // Validate required fields
        if (!name || !url || !type || !category || !description) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            )
        }

        // Use Web3Forms - No API key needed, just access key from web3forms.com
        // Get free access key from: https://web3forms.com
        const web3formsKey = process.env.WEB3FORMS_ACCESS_KEY || 'YOUR_ACCESS_KEY_HERE'

        const formData = new FormData()
        formData.append('access_key', web3formsKey)
        formData.append('subject', `New Tool Submission: ${name}`)
        formData.append('from_name', 'ProjectFreeToUse Submissions')
        formData.append('to', 'projectfreetouse@gmail.com')

        // If user provided email, set as reply-to
        if (email) {
            formData.append('replyto', email)
            formData.append('from_email', email)
        }

        // Create formatted message
        const message = `
🎉 NEW TOOL SUBMISSION

Tool Name: ${name}
Website URL: ${url}
Type: ${type}
Category: ${category}
Description: ${description}
Is Free: ${isFree ? 'Yes ✅' : 'No ❌'}
${email ? `Submitter Email: ${email}` : 'No email provided'}

---
Submitted from ProjectFreeToUse.com
Review and add to Google Sheets to publish.
        `.trim()

        formData.append('message', message)

        // Send to Web3Forms
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        })

        const result = await response.json()

        if (result.success) {
            console.log('Email sent successfully via Web3Forms')
            return NextResponse.json({
                success: true,
                message: 'Submission received and email sent!'
            })
        } else {
            console.error('Web3Forms error:', result)
            return NextResponse.json(
                { error: 'Failed to send email' },
                { status: 500 }
            )
        }
    } catch (error) {
        console.error('Error processing submission:', error)
        return NextResponse.json(
            { error: 'Failed to process submission' },
            { status: 500 }
        )
    }
}
