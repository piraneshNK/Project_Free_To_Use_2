# Firebase Configuration Guide

## Architecture Overview

**Data Sources:**
- **Google Sheets** → Tool data (AI Tools, APIs, Open Source, etc.)
- **Firebase Realtime Database** → User comments only

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"**
3. Enter project name: `project-free-to-use`
4. Disable Google Analytics (optional)
5. Click **"Create project"**

## Step 2: Setup Realtime Database

1. In Firebase Console, go to **Build** → **Realtime Database**
2. Click **"Create Database"**
3. Choose location (e.g., `us-central1`)
4. Start in **test mode** for now

## Step 3: Security Rules

Update your Realtime Database rules to allow public read/write for comments:

```json
{
  "rules": {
    "comments": {
      ".read": true,
      ".write": true,
      "$toolSlug": {
        ".indexOn": ["timestamp"]
      }
    }
  }
}
```

**Note:** This allows anyone to post comments. For production, consider adding authentication.

## Step 4: Environment Variables

Your `.env.local` is already configured with:
- API Key
- Database URL
- Project ID
- etc.

No changes needed - the app is ready to use Firebase for comments!

## Step 5: Test Comments

1. Visit any tool page: `http://localhost:3000/tool/[slug]`
2. Scroll to the comments section
3. Post a test comment
4. Check Firebase Console → Realtime Database to see the data

## Database Structure

Comments are stored as:
```
/comments
  /{toolSlug}
    /{commentId}
      - author: "Guest User"
      - content: "Great tool!"
      - timestamp: 1706893847392
      - avatar: "/placeholder-user.jpg"
```

