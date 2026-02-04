import { Sparkles, Target, Users, Zap, Heart, Globe, TrendingUp, Award } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { BreadcrumbSchema, OrganizationSchema } from "@/components/json-ld"

export const metadata = {
    title: "About ProjectFreeToUse - The World's Largest Free AI Tools Directory",
    description: "Learn about ProjectFreeToUse, the leading platform connecting developers, students, and startups with free AI tools, APIs, open source software, and innovation resources. Trusted by 100K+ users worldwide.",
    keywords: "about projectfreetouse, free ai tools directory, open source platform, free api directory, innovation resources, developer tools",
    openGraph: {
        title: "About ProjectFreeToUse - Free AI Tools & Resources Directory",
        description: "Discover how ProjectFreeToUse helps millions find free AI tools, APIs, and open source software to build faster and smarter.",
        type: "website",
    },
}

const stats = [
    { icon: Users, label: "Active Users", value: "100K+", color: "text-blue-500" },
    { icon: Sparkles, label: "Free Tools", value: "1,000+", color: "text-purple-500" },
    { icon: Globe, label: "Countries", value: "150+", color: "text-green-500" },
    { icon: TrendingUp, label: "Monthly Visits", value: "500K+", color: "text-orange-500" },
]

const values = [
    {
        icon: Heart,
        title: "Free Forever",
        description: "We believe in democratizing access to technology. Every tool in our directory offers a free tier or is completely free to use.",
    },
    {
        icon: Target,
        title: "Quality First",
        description: "We manually curate and verify each submission to ensure you only discover high-quality, reliable tools and resources.",
    },
    {
        icon: Zap,
        title: "Innovation Driven",
        description: "We're passionate about empowering builders, creators, and innovators with the best free resources to bring their ideas to life.",
    },
    {
        icon: Award,
        title: "Community Powered",
        description: "Built by developers, for developers. Our community contributes, reviews, and helps maintain the largest free tools directory.",
    },
]

const milestones = [
    { year: "Sept 2025", event: "ProjectFreeToUse MVP launched with initial free AI tools directory" },
    { year: "Oct 2025", event: "Community feedback and feature requests gathered" },
    { year: "Nov 2025", event: "Expanded database and improved search functionality" },
    { year: "Jan 2026", event: "Added APIs, open source, LLM models, and patent resources" },
    { year: "Feb 2026", event: "Full working site launched with complete feature set and enhanced UI" },
]

export default function AboutPage() {
    return (
        <div className="pt-16">
            <BreadcrumbSchema
                items={[
                    { name: "Home", url: "https://projectfreetouse.com" },
                    { name: "About", url: "https://projectfreetouse.com/about" }
                ]}
            />
            <OrganizationSchema />

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-transparent py-20 lg:py-32">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
                </div>

                <div className="mx-auto max-w-7xl px-4 lg:px-8">
                    <div className="text-center">
                        <Badge className="mb-6 border-primary/30 bg-primary/10 px-4 py-1.5 text-primary hover:bg-primary/20">
                            <Sparkles className="mr-2 h-3 w-3" />
                            About Us
                        </Badge>

                        <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                            Democratizing Access to
                            <br />
                            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                                Free Technology Resources
                            </span>
                        </h1>

                        <p className="mx-auto mb-8 max-w-3xl text-lg text-muted-foreground lg:text-xl">
                            ProjectFreeToUse is the world's largest curated directory of free AI tools, APIs, open source software,
                            and innovation resources. We help developers, students, and startups discover free resources to build
                            faster, smarter, and cheaper.
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {stats.map((stat) => (
                            <div
                                key={stat.label}
                                className="rounded-2xl border border-border bg-card p-6 text-center"
                            >
                                <stat.icon className={`mx-auto mb-3 h-8 w-8 ${stat.color}`} />
                                <p className="mb-1 text-3xl font-bold text-foreground">{stat.value}</p>
                                <p className="text-sm text-muted-foreground">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="border-t border-border py-16 lg:py-24">
                <div className="mx-auto max-w-7xl px-4 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
                        <div>
                            <h2 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">
                                Our Mission
                            </h2>
                            <div className="space-y-4 text-muted-foreground leading-relaxed">
                                <p>
                                    At <strong className="text-foreground">ProjectFreeToUse</strong>, we believe that access to
                                    powerful technology shouldn't be limited by budget. Our mission is to democratize access to
                                    the best free AI tools, developer APIs, open source software, and innovation resources.
                                </p>
                                <p>
                                    We started ProjectFreeToUse because we saw talented developers, ambitious students, and
                                    innovative startups struggling to find quality free tools. Most directories were incomplete,
                                    outdated, or filled with low-quality resources.
                                </p>
                                <p>
                                    Today, we're proud to be the <strong className="text-foreground">world's largest and most
                                        trusted free tools directory</strong>, helping over 100,000 users discover resources that
                                    power their projects, businesses, and ideas.
                                </p>
                            </div>
                        </div>

                        <div>
                            <h2 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">
                                What We Offer
                            </h2>
                            <div className="space-y-4">
                                <div className="rounded-xl border border-border bg-card p-4">
                                    <h3 className="mb-2 font-semibold text-foreground">🤖 Free AI Tools</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Discover AI tools for writing, image generation, video editing, productivity, and more -
                                        all with free tiers or completely free to use.
                                    </p>
                                </div>
                                <div className="rounded-xl border border-border bg-card p-4">
                                    <h3 className="mb-2 font-semibold text-foreground">🔌 Free APIs</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Access developer APIs for AI, weather, finance, maps, and hundreds of other use cases -
                                        all offering free usage tiers.
                                    </p>
                                </div>
                                <div className="rounded-xl border border-border bg-card p-4">
                                    <h3 className="mb-2 font-semibold text-foreground">💻 Open Source Software</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Browse curated open source projects with MIT, Apache, and GPL licenses - free to use
                                        for personal and commercial projects.
                                    </p>
                                </div>
                                <div className="rounded-xl border border-border bg-card p-4">
                                    <h3 className="mb-2 font-semibold text-foreground">💡 Innovation Resources</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Explore patent databases, prior art search tools, and innovation resources to fuel
                                        your next breakthrough idea.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="border-t border-border bg-card/30 py-16 lg:py-24">
                <div className="mx-auto max-w-7xl px-4 lg:px-8">
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">
                            Our Core Values
                        </h2>
                        <p className="mx-auto max-w-2xl text-muted-foreground">
                            The principles that guide everything we do at ProjectFreeToUse
                        </p>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {values.map((value) => (
                            <div
                                key={value.title}
                                className="rounded-2xl border border-border bg-card p-6"
                            >
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                    <value.icon className="h-6 w-6" />
                                </div>
                                <h3 className="mb-2 font-semibold text-foreground">{value.title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Journey Section */}
            <section className="border-t border-border py-16 lg:py-24">
                <div className="mx-auto max-w-4xl px-4 lg:px-8">
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">
                            Our Journey
                        </h2>
                        <p className="text-muted-foreground">
                            From a small side project to the world's largest free tools directory
                        </p>
                    </div>

                    <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-8 top-0 h-full w-0.5 bg-border lg:left-1/2" />

                        <div className="space-y-8">
                            {milestones.map((milestone, index) => (
                                <div
                                    key={index}
                                    className={`relative flex items-center gap-8 ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                                        }`}
                                >
                                    {/* Year badge */}
                                    <div className="absolute left-8 flex h-4 w-4 items-center justify-center rounded-full bg-primary lg:left-1/2 lg:-translate-x-1/2">
                                        <div className="h-2 w-2 rounded-full bg-white" />
                                    </div>

                                    <div className="flex-1 pl-20 lg:pl-0">
                                        <div
                                            className={`rounded-xl border border-border bg-card p-6 ${index % 2 === 0 ? "lg:text-right" : ""
                                                }`}
                                        >
                                            <Badge className="mb-2 bg-primary/10 text-primary">
                                                {milestone.year}
                                            </Badge>
                                            <p className="text-foreground">{milestone.event}</p>
                                        </div>
                                    </div>

                                    <div className="hidden flex-1 lg:block" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="border-t border-border bg-gradient-to-b from-primary/5 to-transparent py-16 lg:py-24">
                <div className="mx-auto max-w-4xl px-4 text-center lg:px-8">
                    <div>
                        <h2 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">
                            Join Our Community
                        </h2>
                        <p className="mb-8 text-lg text-muted-foreground">
                            Be part of the world's largest community of builders discovering free tools and resources
                        </p>
                        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                            <a
                                href="/"
                                className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                            >
                                Explore Free Tools
                            </a>
                            <a
                                href="/submit"
                                className="inline-flex items-center justify-center rounded-lg border border-border bg-card px-6 py-3 font-semibold text-foreground transition-colors hover:bg-secondary"
                            >
                                Submit a Tool
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
