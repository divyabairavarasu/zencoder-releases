import { Terminal, GitBranch, Shield, Zap, Lock, Cpu } from "lucide-react"

const trustLogos = [
  "Ollama",
  "LM Studio",
  "NVIDIA NIM",
  "OpenRouter",
  "Anthropic",
  "OpenAI",
  "Gemini",
  "Mistral",
  "Groq",
]

/** Free cloud models auto-loaded via Ollama — no keys required */
const freeCloudModels = [
  { name: "qwen2.5-coder:7b", tag: "Best for code" },
  { name: "llama3.2:3b", tag: "Fast" },
  { name: "mistral:7b", tag: "General" },
  { name: "phi3:mini", tag: "Tiny" },
  { name: "codellama:7b", tag: "Code" },
  { name: "deepseek-coder:6.7b", tag: "DeepSeek" },
]

const stats = [
  { icon: Zap, label: "6+ free models pre-loaded via Ollama" },
  { icon: Shield, label: "Zero data stored — ever" },
  { icon: Lock, label: "API keys encrypted AES-256-GCM locally" },
  { icon: Cpu, label: "NVIDIA free API — no credit card needed" },
]

export function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-background">
      {/* Gradient orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-36 text-center">
        {/* Badge */}
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border text-xs text-muted-foreground mb-8">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          VSCode Plugin · REPL Chat · Free to install
        </span>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground mb-6 leading-none">
          Code with calm.{" "}
          <span className="text-primary">Ship with confidence.</span>
        </h1>

        {/* Sub-headline */}
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-10">
          ZenCoder routes every AI request to the best model automatically —
          free local models first, cloud when needed. Stop worrying about token
          costs. Start shipping.
        </p>

        {/* Tagline */}
        <p className="text-sm text-muted-foreground/60 italic mb-10">
          &quot;Best things in life are almost free :P&quot;
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <a
            href="#how-it-works"
            className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-base hover:bg-primary/90 transition-colors"
          >
            Install Free →
          </a>
          <a
            href="#providers"
            className="px-8 py-4 rounded-full border border-border text-foreground font-semibold text-base hover:bg-muted transition-colors"
          >
            See Compatible Models
          </a>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
          {stats.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border bg-muted/30"
            >
              <Icon className="w-5 h-5 text-primary" />
              <span className="text-xs text-center text-muted-foreground">
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Free models pre-loaded callout */}
        <div className="max-w-3xl mx-auto mb-12 rounded-2xl border border-green-500/20 bg-green-500/5 px-6 py-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-semibold text-green-400 uppercase tracking-widest">
              Free models — pre-loaded via Ollama · No API key required
            </span>
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {freeCloudModels.map((m) => (
              <span
                key={m.name}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-green-500/20 bg-green-500/10 text-xs font-mono text-green-300"
              >
                {m.name}
                <span className="text-green-500/50">·</span>
                <span className="text-green-400/70 font-sans">{m.tag}</span>
              </span>
            ))}
          </div>
          <p className="text-xs text-muted-foreground/60 mt-3 text-center">
            Install Ollama → run <code className="font-mono text-green-400">ollama pull qwen2.5-coder:7b</code> → ZenCoder auto-discovers it. Done.
          </p>
        </div>

        {/* NVIDIA free API callout */}
        <div className="max-w-3xl mx-auto mb-12 rounded-2xl border border-primary/20 bg-primary/5 px-6 py-5">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <p className="text-sm font-semibold text-foreground mb-1">
                🚀 NVIDIA NIM — Free API Key · No credit card
              </p>
              <p className="text-xs text-muted-foreground">
                Get a free key at <strong className="text-primary">build.nvidia.com/models</strong> and unlock
                Llama 3.1 405B, Mistral Large, Phi-3, and more at zero cost.
              </p>
            </div>
            <code className="text-xs font-mono bg-muted px-3 py-2 rounded-lg text-primary whitespace-nowrap">
              zencoder-secrets add nvidia
            </code>
          </div>
        </div>

        {/* Trust bar */}
        <p className="text-xs text-muted-foreground mb-4 uppercase tracking-widest">
          Works with
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {trustLogos.map((name) => (
            <span
              key={name}
              className={
                name === "NVIDIA NIM"
                  ? "px-4 py-1.5 rounded-full border border-primary/40 text-sm text-primary font-medium"
                  : "px-4 py-1.5 rounded-full border border-border text-sm text-muted-foreground"
              }
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
