"use client"

import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

export default function SubmitPage() {
  return (
    <div className="pt-16">
      <div className="mx-auto max-w-4xl px-4 py-12 lg:px-8 lg:py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Sparkles className="h-6 w-6" />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-foreground">Submit a Tool</h1>
          <p className="text-muted-foreground">
            Share a free resource with the community. All submissions are reviewed before publishing.
          </p>
        </motion.div>

        {/* Embedded Google Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-border bg-card p-2 lg:p-4"
        >
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSc5nUZN-s_RPs6M1CLlyJpuUbmA7lC3QXlHauWo2uw0W6-M_Q/viewform?embedded=true"
            width="100%"
            height="1400"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            className="rounded-lg"
          >
            Loading…
          </iframe>
        </motion.div>
      </div>
    </div>
  )
}
