"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { getDeviceId, isRegistered } from "@/lib/device-auth"
import { registerUser } from "@/lib/firebase-users"

export default function LoginPage() {
  const router = useRouter()

  useEffect(() => {
    // Auto-register with device ID
    const deviceId = getDeviceId()

    // Try to register in Firebase (optional)
    registerUser(deviceId).catch((error) => {
      console.warn('Firebase registration failed (non-critical):', error)
    })

    // Redirect to homepage immediately
    router.push("/")
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="h-8 w-8 mx-auto animate-spin rounded-full border-4 border-primary border-t-transparent mb-4" />
        <p className="text-sm text-muted-foreground">Setting up your device...</p>
      </div>
    </div>
  )
}
