import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { EngineeringIllustration } from "@/components/engineering-illustration"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Zap, FileSearch } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/50 px-4 py-1.5 text-sm text-muted-foreground">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
                </span>
                AI-Powered Analysis
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
                Analyze engineering documents with AI.
              </h1>

              <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
                Extract key parameters, detect safety issues, and generate comprehensive risk validation reports from
                your engineering documents in seconds.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="group">
                  <Link href="/upload">
                    Upload Document
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/history">View History</Link>
                </Button>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <EngineeringIllustration />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="border-t border-border/40 bg-muted/30">
          <div className="container mx-auto px-4 py-20">
            <div className="text-center mb-16">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Enterprise-grade document analysis</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Built for engineering teams who need reliable, accurate, and fast document processing.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  icon: FileSearch,
                  title: "Smart Extraction",
                  description:
                    "AI automatically identifies and extracts key engineering parameters from complex documents.",
                },
                {
                  icon: Shield,
                  title: "Safety Validation",
                  description:
                    "Detect potential safety issues and compliance gaps with industry-standard rule validation.",
                },
                {
                  icon: Zap,
                  title: "Instant Reports",
                  description:
                    "Generate comprehensive risk assessment reports with actionable recommendations in seconds.",
                },
              ].map((feature, index) => (
                <div
                  key={feature.title}
                  className="group relative rounded-xl border border-border/60 bg-card p-8 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                  style={{ animationDelay: `${0.1 * index}s` }}
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Supported Industries */}
        <section className="container mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <h2 className="text-xl font-semibold text-foreground mb-2">Supporting multiple industries</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {["Oil & Gas", "Mechanical", "Electrical", "Chemical"].map((industry) => (
              <div
                key={industry}
                className="flex items-center gap-2 rounded-full border border-border/60 bg-card px-6 py-3 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
              >
                {industry}
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-muted/20">
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-sm text-muted-foreground">
            Secure, reliable, and enterprise-ready document analysis.
          </p>
        </div>
      </footer>
    </div>
  )
}
