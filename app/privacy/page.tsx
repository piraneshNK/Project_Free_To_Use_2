import { Shield } from "lucide-react"
import { BreadcrumbSchema } from "@/components/json-ld"

export const metadata = {
    title: "Privacy Policy - ProjectFreeToUse",
    description: "Privacy Policy for ProjectFreeToUse - Learn how we handle your data on our free AI tools directory.",
}

export default function PrivacyPage() {
    return (
        <div className="pt-16">
            <BreadcrumbSchema
                items={[
                    { name: "Home", url: "https://projectfreetouse.com" },
                    { name: "Privacy Policy", url: "https://projectfreetouse.com/privacy" }
                ]}
            />

            <div className="mx-auto max-w-4xl px-4 py-12 lg:px-8 lg:py-16">
                {/* Header */}
                <div className="mb-8 text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Shield className="h-6 w-6" />
                    </div>
                    <h1 className="mb-2 text-3xl font-bold text-foreground">Privacy Policy</h1>
                    <p className="text-muted-foreground">
                        Last updated: February 4, 2026
                    </p>
                </div>

                {/* Content */}
                <div className="prose prose-gray dark:prose-invert max-w-none">
                    <div className="rounded-2xl border border-border bg-card p-6 lg:p-8">
                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-foreground">Introduction</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                ProjectFreeToUse is a simple directory website that helps people discover free AI tools, APIs,
                                open source software, and innovation resources. We are committed to protecting your privacy.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-foreground">What We Collect</h2>
                            <p className="mb-4 text-muted-foreground leading-relaxed">
                                As a simple directory website, we collect minimal information:
                            </p>
                            <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                                <li><strong className="text-foreground">Tool Submissions:</strong> When you submit a tool, we collect the tool information and your email (optional) for communication purposes.</li>
                                <li><strong className="text-foreground">Analytics:</strong> We may use basic analytics to understand how visitors use our site (page views, popular tools, etc.).</li>
                                <li><strong className="text-foreground">Cookies:</strong> We use essential cookies for site functionality and theme preferences.</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-foreground">How We Use Your Information</h2>
                            <p className="mb-4 text-muted-foreground leading-relaxed">
                                We use the information we collect to:
                            </p>
                            <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                                <li>Maintain and improve our directory of free tools</li>
                                <li>Review and publish tool submissions</li>
                                <li>Communicate with you about your submissions (if you provided an email)</li>
                                <li>Understand how people use our directory to make it better</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-foreground">Data Sharing</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                We do not sell, trade, or rent your personal information to third parties. We are a simple
                                directory website focused on helping people discover free tools. Any tool information you
                                submit may be publicly displayed in our directory.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-foreground">Third-Party Links</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Our directory contains links to external websites (the tools we list). We are not responsible
                                for the privacy practices of these external sites. Please review their privacy policies before
                                using their services.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-foreground">Your Rights</h2>
                            <p className="mb-4 text-muted-foreground leading-relaxed">
                                You have the right to:
                            </p>
                            <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                                <li>Request deletion of any personal information we have about you</li>
                                <li>Opt-out of any communications</li>
                                <li>Request information about what data we have collected</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-foreground">Data Security</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                We implement reasonable security measures to protect your information. However, no method
                                of transmission over the internet is 100% secure.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-foreground">Children's Privacy</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Our directory is not intended for children under 13. We do not knowingly collect personal
                                information from children.
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-4 text-2xl font-semibold text-foreground">Contact Us</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                If you have any questions about this Privacy Policy, please contact us at:{" "}
                                <a href="mailto:projectfreetouse@gmail.com" className="text-primary hover:underline">
                                    projectfreetouse@gmail.com
                                </a>
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}
