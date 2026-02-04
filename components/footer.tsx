"use client"

import React from "react"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Github, Twitter, Linkedin, Mail } from "lucide-react"

const footerLinks = {
  Resources: [
    { href: "/ai-tools", label: "Free AI Tools" },
    { href: "/apis", label: "Free APIs" },
    { href: "/open-source", label: "Open Source" },
    { href: "/open-patents", label: "Open Patents" },
  ],
  Categories: [
    { href: "/ai-tools?category=writing", label: "Writing AI" },
    { href: "/ai-tools?category=image", label: "Image AI" },
    { href: "/ai-tools?category=productivity", label: "Productivity AI" },
    { href: "/apis?category=developer", label: "Developer APIs" },
  ],
  Company: [
    { href: "/blog", label: "Blog" },
    { href: "/submit", label: "Submit Tool" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
  Legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
  ],
}

export function Footer() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail("")
    }
  }

  return (
    <footer className="border-t border-border bg-card/50">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        {/* Newsletter Section */}
        <div className="mb-12 rounded-2xl border border-border bg-secondary/30 p-6 lg:p-8">
          <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
            <div>
              <h3 className="text-xl font-semibold text-foreground">
                Stay updated with the latest free tools
              </h3>
              <p className="mt-1 text-muted-foreground">
                Get weekly curated picks delivered to your inbox.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex w-full max-w-md gap-2">
              {subscribed ? (
                <p className="text-primary">Thanks for subscribing!</p>
              ) : (
                <>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 border-border bg-background"
                    required
                  />
                  <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Subscribe
                  </Button>
                </>
              )}
            </form>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-12">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="mb-4 text-sm font-semibold text-foreground">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-sm font-bold text-primary-foreground">PF</span>
            </div>
            <span className="font-semibold text-foreground">ProjectFreeToUse</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2026 ProjectFreeToUse. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a
              href="mailto:hello@projectfreetouse.com"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
