import { FileText } from "lucide-react"
import { BreadcrumbSchema } from "@/components/json-ld"

export const metadata = {
    title: "Terms of Service - ProjectFreeToUse",
    description: "Terms of Service for ProjectFreeToUse - Guidelines for using our free AI tools directory.",
}

export default function TermsPage() {
    return (
        <div className="pt-16">
            <BreadcrumbSchema
                items={[
                    { name: "Home", url: "https://projectfreetouse.com" },
                    { name: "Terms of Service", url: "https://projectfreetouse.com/terms" }
                ]}
            />

            <div className="mx-auto max-w-4xl px-4 py-12 lg:px-8 lg:py-16">
                {/* Header */}
                <div className="mb-8 text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <FileText className="h-6 w-6" />
                    </div>
                    <h1 className="mb-2 text-3xl font-bold text-foreground">Terms of Service</h1>
                    <p className="text-muted-foreground">
                        Last updated: February 4, 2026
                    </p>
                </div>

                {/* Content */}
                <div className="prose prose-gray dark:prose-invert max-w-none">
                    <div className="rounded-2xl border border-border bg-card p-6 lg:p-8">
                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-foreground">Welcome to ProjectFreeToUse</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                ProjectFreeToUse is a simple directory website that helps people discover free AI tools, APIs,
                                open source software, and innovation resources. By using our website, you agree to these terms.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-foreground">What We Provide</h2>
                            <p className="mb-4 text-muted-foreground leading-relaxed">
                                We provide:
                            </p>
                            <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                                <li>A curated directory of free tools and resources</li>
                                <li>Information about AI tools, APIs, open source projects, and patents</li>
                                <li>Links to external websites and services</li>
                                <li>A platform to submit and discover free tools</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-foreground">Your Responsibilities</h2>
                            <p className="mb-4 text-muted-foreground leading-relaxed">
                                When using ProjectFreeToUse, you agree to:
                            </p>
                            <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                                <li>Use the directory for lawful purposes only</li>
                                <li>Not submit false, misleading, or spam content</li>
                                <li>Respect intellectual property rights</li>
                                <li>Not attempt to harm or disrupt our website</li>
                                <li>Verify information before using any listed tools</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-foreground">Tool Submissions</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                When you submit a tool to our directory, you confirm that:
                            </p>
                            <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                                <li>The information you provide is accurate and truthful</li>
                                <li>You have the right to submit this information</li>
                                <li>We may review, edit, or reject any submission</li>
                                <li>We may remove any listing at our discretion</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-foreground">Disclaimer</h2>
                            <p className="mb-4 text-muted-foreground leading-relaxed">
                                <strong className="text-foreground">Important:</strong> ProjectFreeToUse is a directory website
                                that guides people to free tools. We:
                            </p>
                            <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                                <li><strong className="text-foreground">Do not own or operate</strong> the tools listed in our directory</li>
                                <li><strong className="text-foreground">Are not responsible</strong> for the quality, accuracy, or availability of listed tools</li>
                                <li><strong className="text-foreground">Do not guarantee</strong> that tools will remain free or functional</li>
                                <li><strong className="text-foreground">Are not liable</strong> for any issues arising from using listed tools</li>
                            </ul>
                            <p className="mt-4 text-muted-foreground leading-relaxed">
                                Always review the terms of service and privacy policies of any tool before using it.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-foreground">External Links</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Our directory contains links to external websites. We are not responsible for the content,
                                privacy practices, or terms of these external sites. Use them at your own risk.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-foreground">Intellectual Property</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                The ProjectFreeToUse website design, logo, and content are our property. Tool names, logos,
                                and descriptions belong to their respective owners. We respect intellectual property rights
                                and expect you to do the same.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-foreground">Limitation of Liability</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                ProjectFreeToUse is provided "as is" without warranties. We are not liable for any damages
                                arising from your use of our directory or any tools listed on it. This is a free service to
                                help people discover tools.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-foreground">Changes to Terms</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                We may update these terms from time to time. Continued use of our website means you accept
                                any changes. We'll update the "Last updated" date at the top.
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-4 text-2xl font-semibold text-foreground">Contact Us</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                If you have questions about these Terms of Service, please contact us at:{" "}
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
