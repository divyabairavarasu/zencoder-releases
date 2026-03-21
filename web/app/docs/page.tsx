import { DocsLayout } from "@/components/blocks/docs-layout"
import { TextParallaxContentExample, ParallaxSectionContent } from "@/components/ui/text-parallax-content-scroll"
import { ArrowUpRight } from "lucide-react"

const parallaxSections = [
  {
    imgUrl:
      "https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=2074&auto=format&fit=crop",
    subheading: "Install in minutes",
    heading: "Zero friction setup.",
    content: (
      <ParallaxSectionContent
        title="Start in under 5 minutes"
        body={
          <>
            <p>
              Install the ZenCoder daemon and CLI with a single <code className="text-primary font-mono text-sm">go install</code> command.
              Connect Ollama or LM Studio for free local AI — no API keys needed.
            </p>
            <p>
              Run <code className="text-primary font-mono text-sm">zencoderd</code> once,
              then open your terminal or VSCode and start coding with AI immediately.
            </p>
          </>
        }
        ctaLabel="Quick Start Guide"
        ctaHref="/docs/quickstart"
      />
    ),
  },
  {
    imgUrl:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop",
    subheading: "Your keys, your rules",
    heading: "zencoder-secrets.",
    content: (
      <ParallaxSectionContent
        title="BYOK — Bring Your Own Key"
        body={
          <>
            <p>
              Store API keys for Anthropic, OpenAI, Gemini, Mistral, Groq, Cohere, and Together
              — encrypted at rest, never sent to ZenCoder.
            </p>
            <p>
              One command adds a key. The router picks the right provider automatically,
              or you pin a specific one with <code className="text-primary font-mono text-sm">--routing cloud</code>.
            </p>
          </>
        }
        ctaLabel="Provider Setup"
        ctaHref="/docs/providers"
      />
    ),
  },
  {
    imgUrl:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
    subheading: "Read. Edit. Iterate.",
    heading: "Agent Mode.",
    content: (
      <ParallaxSectionContent
        title="Your AI teammate in the codebase"
        body={
          <>
            <p>
              Agent mode gives ZenCoder six tools: <code className="text-primary font-mono text-sm">file_read</code>,{" "}
              <code className="text-primary font-mono text-sm">file_glob</code>,{" "}
              <code className="text-primary font-mono text-sm">workspace_search</code>,{" "}
              <code className="text-primary font-mono text-sm">list_directory</code>,{" "}
              <code className="text-primary font-mono text-sm">file_edit</code>, and{" "}
              <code className="text-primary font-mono text-sm">file_remove</code>.
            </p>
            <p>
              Describe a multi-file refactor in plain English. ZenCoder reads the
              context, proposes precise edits, and iterates until the task is done.
            </p>
          </>
        }
        ctaLabel="Agent Mode Deep Dive"
        ctaHref="/docs/agent"
      />
    ),
  },
]

export default function DocsHomePage() {
  return (
    <DocsLayout activePath="/docs">
      {/* Hero */}
      <div className="mb-12">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border text-xs text-muted-foreground mb-6">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Documentation
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4">
          ZenCoder Docs
        </h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
          Everything you need to install, configure, and get the most out of ZenCoder —
          from your first <code className="text-primary font-mono text-sm">zencoder</code> command
          to running a full agentic workflow.
        </p>

        {/* Quick links grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          {[
            { emoji: "🚀", label: "Quick Start", desc: "Up and running in 5 minutes", href: "/docs/quickstart" },
            { emoji: "💻", label: "CLI Reference", desc: "Every command and flag", href: "/docs/cli" },
            { emoji: "🔌", label: "VSCode Extension", desc: "Chat panel, context, shortcuts", href: "/docs/vscode" },
            { emoji: "🔑", label: "Provider Setup", desc: "Ollama, LM Studio, BYOK keys", href: "/docs/providers" },
            { emoji: "🤖", label: "Agent Mode", desc: "Multi-step autonomous coding", href: "/docs/agent" },
            { emoji: "🛠", label: "Troubleshooting", desc: "Common issues and fixes", href: "/docs/troubleshooting" },
          ].map((card) => (
            <a
              key={card.href}
              href={card.href}
              className="flex items-start gap-4 p-4 rounded-xl border border-border hover:bg-muted/30 hover:border-primary/30 transition-all group"
            >
              <span className="text-2xl">{card.emoji}</span>
              <div>
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {card.label}
                </p>
                <p className="text-sm text-muted-foreground">{card.desc}</p>
              </div>
              <ArrowUpRight className="w-4 h-4 ml-auto text-muted-foreground/40 group-hover:text-primary transition-colors flex-shrink-0 mt-0.5" />
            </a>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-border my-12" />
      <p className="text-center text-xs text-muted-foreground mb-2 uppercase tracking-widest">
        Feature highlights
      </p>
      <p className="text-center text-2xl font-bold text-foreground mb-2">
        Scroll to explore ZenCoder
      </p>
      <p className="text-center text-muted-foreground mb-0">
        Three things that make ZenCoder different.
      </p>

      {/* Full-bleed parallax — lives outside the prose max-width */}
      <div className="relative -mx-6 md:-mx-12 mt-8">
        <TextParallaxContentExample
          sections={parallaxSections}
          className="bg-background"
        />
      </div>
    </DocsLayout>
  )
}
