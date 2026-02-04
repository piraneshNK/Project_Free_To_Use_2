"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { User, RefreshCw, ArrowRight, Sparkles, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { getDeviceId, setDisplayName, generateRandomName, isRegistered } from "@/lib/device-auth"
import { registerUser } from "@/lib/firebase-users"

export default function LoginPage() {
  const router = useRouter()
  const [displayName, setDisplayNameState] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Check if user is already registered
    if (isRegistered()) {
      // Already registered, redirect to homepage
      router.push("/")
    } else {
      // Generate a random name as default
      setDisplayNameState(generateRandomName())
      setIsLoading(false)
    }
  }, [router])

  const handleGenerateRandom = () => {
    const randomName = generateRandomName()
    setDisplayNameState(randomName)
  }

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!displayName.trim() || isSubmitting) return

    setIsSubmitting(true)
    setError(null)

    try {
      const deviceId = getDeviceId()

      // Save to localStorage (marks as registered)
      setDisplayName(displayName.trim())

      // Save to Firebase
      const result = await registerUser(deviceId, displayName.trim())

      if (result.success) {
        // Redirect to homepage
        router.push("/")
      } else {
        setError(result.message || 'Failed to register. Please try again.')
      }
    } catch (error) {
      console.error('Registration error:', error)
      setError('Failed to register. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="pt-16">
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <div className="mb-8 text-center">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                <span className="font-bold text-primary-foreground">PF</span>
              </div>
              <span className="text-xl font-semibold text-foreground">ProjectFreeToUse</span>
            </Link>
          </div>

          {/* Card */}
          <div className="rounded-2xl border border-border bg-card p-6 lg:p-8">
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-bold text-foreground">Welcome!</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Choose your display name (one-time setup)
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleContinue} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="displayname">Your Display Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="displayname"
                    type="text"
                    placeholder="Enter a cool name..."
                    value={displayName}
                    onChange={(e) => setDisplayNameState(e.target.value)}
                    required
                    className="border-border bg-secondary/30 pl-10 pr-12"
                    maxLength={20}
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    onClick={handleGenerateRandom}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors disabled:opacity-50"
                    title="Generate random name"
                    disabled={isSubmitting}
                  >
                    <RefreshCw className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" />
                  This name is permanent and cannot be changed later
                </p>
              </div>

              {/* Random Name Suggestions */}
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  Quick picks:
                </p>
                <div className="flex flex-wrap gap-2">
                  {[generateRandomName(), generateRandomName(), generateRandomName()].map((name, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setDisplayNameState(name)}
                      className="rounded-lg border border-border bg-secondary/50 px-3 py-1 text-xs font-medium text-foreground hover:bg-secondary hover:border-primary transition-colors disabled:opacity-50"
                      disabled={isSubmitting}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={!displayName.trim() || isSubmitting}
              >
                {isSubmitting ? 'Setting up...' : 'Continue'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>

            {/* Info */}
            <div className="mt-6 rounded-lg bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/50 p-4">
              <p className="text-xs text-amber-900 dark:text-amber-300">
                <strong className="font-semibold">Important:</strong> Your display name is permanent and cannot be changed.
                Choose carefully! No email or account required - everything is stored locally on this device.
              </p>
            </div>

            {/* Terms */}
            <p className="mt-6 text-center text-xs text-muted-foreground">
              By continuing, you agree to our{" "}
              <Link href="/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
