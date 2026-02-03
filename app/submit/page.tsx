"use client"

import React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, CheckCircle, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const toolTypes = [
  { value: "app", label: "Free App" },
  { value: "api", label: "Free API" },
  { value: "open-source", label: "Open Source Project" },
  { value: "patent", label: "Open Patent" },
]

const categories = [
  { value: "productivity", label: "Productivity" },
  { value: "design", label: "Design" },
  { value: "education", label: "Education" },
  { value: "ai-tools", label: "AI Tools" },
  { value: "developer", label: "Developer" },
  { value: "finance", label: "Finance" },
  { value: "technology", label: "Technology" },
  { value: "research", label: "Research" },
]

export default function SubmitPage() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    type: "",
    category: "",
    description: "",
    isFree: true,
    email: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In production, this would submit to Firebase
    console.log("Submitted:", formData)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="pt-16">
        <div className="mx-auto max-w-2xl px-4 py-16 lg:px-8 lg:py-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl border border-primary/20 bg-card p-8 text-center lg:p-12"
          >
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <h1 className="mb-4 text-2xl font-bold text-foreground">Submission Received!</h1>
            <p className="mb-8 text-muted-foreground">
              Thank you for submitting your tool. Our team will review it and add it to the directory
              within 24-48 hours.
            </p>
            <Button
              onClick={() => {
                setSubmitted(false)
                setFormData({
                  name: "",
                  url: "",
                  type: "",
                  category: "",
                  description: "",
                  isFree: true,
                  email: "",
                })
              }}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Submit Another Tool
            </Button>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-16">
      <div className="mx-auto max-w-2xl px-4 py-12 lg:px-8 lg:py-16">
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

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl border border-border bg-card p-6 lg:p-8"
        >
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Tool Name *</Label>
            <Input
              id="name"
              placeholder="e.g., Notion, OpenAI API"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="border-border bg-secondary/30"
            />
          </div>

          {/* URL */}
          <div className="space-y-2">
            <Label htmlFor="url">Website URL *</Label>
            <Input
              id="url"
              type="url"
              placeholder="https://example.com"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              required
              className="border-border bg-secondary/30"
            />
          </div>

          {/* Type and Category */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Type *</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData({ ...formData, type: value })}
                required
              >
                <SelectTrigger className="border-border bg-secondary/30">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {toolTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
                required
              >
                <SelectTrigger className="border-border bg-secondary/30">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Describe what this tool does and why it's useful..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              className="min-h-[120px] border-border bg-secondary/30"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Your Email (optional)</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="border-border bg-secondary/30"
            />
            <p className="text-xs text-muted-foreground">
              We'll notify you when your submission is approved.
            </p>
          </div>

          {/* Free Checkbox */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="isFree"
              checked={formData.isFree}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, isFree: checked as boolean })
              }
            />
            <Label htmlFor="isFree" className="cursor-pointer">
              This tool is completely free to use
            </Label>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            disabled={!formData.name || !formData.url || !formData.type || !formData.category || !formData.description}
          >
            <Send className="mr-2 h-4 w-4" />
            Submit Tool
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            By submitting, you agree to our terms of service and confirm that this tool is genuinely free.
          </p>
        </motion.form>
      </div>
    </div>
  )
}
