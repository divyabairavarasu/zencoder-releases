import { DocsLayout } from "@/components/blocks/docs-layout"
import { CodeBlock, StepList, Callout, DocHeading, NextStep, Badge } from "@/components/blocks/doc-ui"
import { Lock, Shield, Eye, Server } from "lucide-react"

/** Pre-loaded free Ollama models — local downloads + free cloud models (no API key required) */
const ollamaFreeModels = [
  { name: "nemotron-3-super:cloud", pull: "ollama pull nemotron-3-super:cloud", tag: "★ Most powerful · free cloud", size: "Cloud" },
  { name: "qwen2.5-coder:7b", pull: "ollama pull qwen2.5-coder:7b", tag: "Best for code", size: "4.7GB" },
  { name: "llama3.2:3b", pull: "ollama pull llama3.2:3b", tag: "Fast · 2GB" , size: "2.0GB" },
  { name: "mistral:7b", pull: "ollama pull mistral:7b", tag: "General purpose", size: "4.1GB" },
  { name: "codellama:7b", pull: "ollama pull codellama:7b", tag: "Meta code model", size: "3.8GB" },
  { name: "phi3:mini", pull: "ollama pull phi3:mini", tag: "Tiny · fast", size: "2.3GB" },
  { name: "deepseek-coder:6.7b", pull: "ollama pull deepseek-coder:6.7b", tag: "DeepSeek", size: "3.8GB" },
]

const providers = [
  {
    id: "ollama",
    name: "Ollama",
    type: "Local",
    free: true,
    models: ["nemotron-3-super:cloud", "qwen2.5-coder:7b", "llama3.2:3b", "mistral:7b", "codellama:7b", "phi3:mini", "deepseek-coder:6.7b"],
    steps: [
      { title: "Install", content: <><p>macOS: <code className="font-mono text-sm text-primary">brew install ollama</code> or download from <strong>ollama.com</strong>. Requires Ollama v0.12 or later for cloud models.</p></> },
      { title: "Start service", content: <CodeBlock language="bash" code={`ollama serve`} /> },
      { title: "Sign in for cloud models", content: <><p>Cloud models (e.g. <code className="font-mono text-sm">nemotron-3-super:cloud</code>) run on Ollama&apos;s infrastructure for free but require a signed-in Ollama account:</p><CodeBlock language="bash" code={`# Sign in to your Ollama account (one-time setup)\nollama signin\n\n# Then pull a cloud model\nollama pull nemotron-3-super:cloud`} /><p className="text-sm text-muted-foreground mt-2">No sign-in needed for local models — only for <code className="font-mono text-sm">:cloud</code> variants.</p></> },
      { title: "Pull a local model", content: <CodeBlock language="bash" code={`# Recommended for coding\nollama pull qwen2.5-coder:7b\n\n# Or a lightweight fast model\nollama pull llama3.2:3b\n\nollama list`} /> },
      { title: "ZenCoder auto-detects it", content: <><p>Zencoderd discovers Ollama at <code className="font-mono text-sm">localhost:11434</code> automatically. Run <code className="font-mono text-sm">zencoder models</code> to confirm.</p></> },
    ],
  },
  {
    id: "lmstudio",
    name: "LM Studio",
    type: "Local",
    free: true,
    models: ["Qwen2.5-Coder", "Mistral 7B", "Llama 3", "Phi-3"],
    steps: [
      { title: "Install", content: <><p>Download from <strong>lmstudio.ai</strong> and install as a macOS app.</p></> },
      { title: "Download a model", content: <><p>Search <strong>Qwen2.5-Coder</strong> in the Discover tab → Download.</p></> },
      { title: "Start local server", content: <><p>Local Server tab → select model → <strong>Start Server</strong>. Listens on <code className="font-mono text-sm">localhost:1234</code>.</p></> },
      {
        title: "Register with ZenCoder",
        content: (
          <CodeBlock
            language="bash"
            code={`zencoder-secrets add-byok \\
  --url http://localhost:1234/v1 \\
  --provider lmstudio \\
  --name "LM Studio local"

# Or via REPL:
/byok url=http://localhost:1234/v1 key=none provider=lmstudio`}
          />
        ),
      },
    ],
  },
  {
    id: "anthropic",
    name: "Anthropic",
    type: "Cloud",
    free: false,
    models: ["claude-3-5-sonnet", "claude-3-haiku", "claude-3-opus"],
    steps: [
      { title: "Get an API key", content: <><p>Sign up at <strong>console.anthropic.com</strong> → API Keys → Create Key.</p></> },
      {
        title: "Add with zencoder-secrets",
        content: (
          <CodeBlock
            language="bash"
            code={`zencoder-secrets add anthropic
# Prompts: Enter Anthropic API key:
# Key stored encrypted at ~/.zencoder/secrets/`}
          />
        ),
      },
      { title: "Select in REPL", content: <CodeBlock language="bash" code={`zencoder\n> /model anthropic/claude-3-haiku`} /> },
    ],
  },
  {
    id: "openai",
    name: "OpenAI",
    type: "Cloud",
    free: false,
    models: ["gpt-4o", "gpt-4o-mini", "gpt-3.5-turbo"],
    steps: [
      { title: "Get an API key", content: <><p>Sign up at <strong>platform.openai.com</strong> → API keys → Create new secret key.</p></> },
      {
        title: "Add with zencoder-secrets",
        content: (
          <CodeBlock
            language="bash"
            code={`zencoder-secrets add openai
# Enter OpenAI API key: sk-...`}
          />
        ),
      },
      { title: "Use in chat", content: <CodeBlock language="bash" code={`zencoder chat -m openai/gpt-4o "Explain closures in Go"`} /> },
    ],
  },
  {
    id: "gemini",
    name: "Gemini",
    type: "Cloud",
    free: true,
    models: ["gemini-1.5-pro", "gemini-1.5-flash"],
    steps: [
      { title: "Get an API key", content: <><p>Visit <strong>aistudio.google.com</strong> → Get API Key (free tier available).</p></> },
      {
        title: "Add with zencoder-secrets",
        content: <CodeBlock language="bash" code={`zencoder-secrets add gemini`} />,
      },
    ],
  },
  {
    id: "nvidia",
    name: "NVIDIA NIM",
    type: "Cloud",
    free: true,
    models: ["meta/llama-3.1-405b-instruct", "mistralai/mistral-large", "microsoft/phi-3-mini-128k-instruct", "nvidia/llama3-chatqa-1.5-70b", "google/gemma-2-9b-it"],
    steps: [
      {
        title: "Get a free API key",
        content: (
          <>
            <p>
              Visit <strong>build.nvidia.com/models</strong> → sign in with your NVIDIA account (free) →{" "}
              <strong>Get API Key</strong>. No credit card required for the free tier.
            </p>
            <p className="text-sm mt-2">
              The free tier gives you <strong>1,000 API calls/month</strong> across all NIM models including
              Llama 3.1 405B and Mistral Large.
            </p>
          </>
        ),
      },
      {
        title: "Add with zencoder-secrets",
        content: (
          <CodeBlock
            language="bash"
            code={`# Add your NVIDIA NIM key — you will be prompted to enter it securely
zencoder-secrets add -url https://integrate.api.nvidia.com/v1 \\
  -model nemotron-3-nano-30b-a3b \\
  -alias nvidia-key1
# → Enter API key for nvidia (alias: nvidia-key1): [hidden]
# → BYOK provider registered.

# Add more keys / models as needed (ZenCoder load-balances across them)
zencoder-secrets add -url https://integrate.api.nvidia.com/v1 \\
  -model llama-3.3-70b-instruct \\
  -alias nvidia-key2

# Verify keys are registered
zencoder-secrets list

# Test the key is working
zencoder-secrets test -provider nvidia -alias nvidia-key1`}
          />
        ),
      },
      {
        title: "Use in ZenCoder",
        content: (
          <CodeBlock
            language="bash"
            code={`# Inside the REPL, open the model picker and select your NVIDIA model:
> /model
# ↑↓ to navigate · Enter to select

# Or switch directly:
> /model nvidia/nemotron-3-nano-30b-a3b
Switched model to: nvidia/nemotron-3-nano-30b-a3b`}
          />
        ),
      },
    ],
  },
  {
    id: "openrouter",
    name: "OpenRouter",
    type: "Cloud",
    free: true,
    models: ["mistralai/mistral-7b-instruct:free", "google/gemma-2-9b-it:free"],
    steps: [
      { title: "Get a free API key", content: <><p>Sign up at <strong>openrouter.ai</strong> — free-tier models available with no credit card.</p></> },
      {
        title: "Add as BYOK endpoint",
        content: (
          <CodeBlock
            language="bash"
            code={`zencoder-secrets add-byok \\
  --url https://openrouter.ai/api/v1 \\
  --key sk-or-... \\
  --provider openrouter \\
  --name "OpenRouter free"`}
          />
        ),
      },
    ],
  },
]

export default function ProvidersPage() {
  return (
    <DocsLayout activePath="/docs/providers">
      <DocHeading level={1}>Provider Setup</DocHeading>
      <p className="text-lg text-muted-foreground mb-8">
        ZenCoder works with local models (Ollama, LM Studio) and cloud providers (Anthropic, OpenAI, Gemini, NVIDIA NIM, and more).
        Use <code className="font-mono text-sm">zencoder-secrets</code> to manage all cloud API keys safely.
      </p>

      <Callout type="tip">
        Start with Ollama — it&apos;s free, runs locally, and requires no API keys.
        For cloud power at zero cost, add a free NVIDIA NIM key in 2 minutes.
      </Callout>

      {/* Pre-loaded Ollama free models */}
      <DocHeading level={2}>Pre-loaded free models via Ollama</DocHeading>
      <p className="text-muted-foreground mb-4">
        After installing Ollama, pull any of these models and ZenCoder auto-discovers them.
        <strong className="text-foreground"> No API keys. No accounts. No cost.</strong>
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {ollamaFreeModels.map((m) => (
          <div key={m.name} className="rounded-xl border border-green-500/20 bg-green-500/5 p-3">
            <div className="flex items-center justify-between mb-1.5">
              <code className="text-sm font-mono text-green-300">{m.name}</code>
              <span className="text-[10px] text-green-500/70 font-semibold">{m.size}</span>
            </div>
            <p className="text-xs text-muted-foreground mb-1">{m.tag}</p>
            <code className="text-[10px] font-mono text-muted-foreground/60">{m.pull}</code>
          </div>
        ))}
      </div>
      <Callout type="info">
        ZenCoder&apos;s cascade router automatically picks the best available local model.
        No configuration needed — just pull and go.
      </Callout>

      {/* zencoder-secrets overview */}
      <DocHeading level={2}>zencoder-secrets — BYOK key manager</DocHeading>

      {/* Security highlight card */}
      <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10 p-6 mb-6">
        <div className="flex items-start gap-4 mb-5">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
            <Lock className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground mb-1">Your keys. Your machine. Your rules.</h3>
            <p className="text-sm text-muted-foreground">
              <code className="font-mono text-primary">zencoder-secrets</code> encrypts every API key with
              AES-256-GCM before writing to disk. The encryption key is derived from your machine&apos;s unique
              identifier — it&apos;s physically impossible to decrypt on any other machine.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { icon: Shield, title: "AES-256-GCM", desc: "Military-grade encryption at rest" },
            { icon: Server, title: "Local only", desc: "Keys never leave ~/.zencoder/secrets/" },
            { icon: Eye, title: "Masked in logs", desc: "sk-ant-...●●●● — always redacted" },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-2.5 bg-background/60 rounded-xl border border-primary/20 px-3 py-3">
              <Icon className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-foreground">{title}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="text-muted-foreground mb-4">
        <code className="font-mono text-sm text-primary">zencoder-secrets</code> is ZenCoder&apos;s dedicated CLI for managing API keys.
        Keys are encrypted at rest (AES-256-GCM) and never sent to ZenCoder&apos;s servers.
      </p>

      <div className="overflow-x-auto rounded-xl border border-border mb-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/40">
              <th className="text-left px-4 py-3 font-semibold">Command</th>
              <th className="text-left px-4 py-3 font-semibold">What it does</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["zencoder-secrets add <provider>", "Interactively add an API key for a provider"],
              ["zencoder-secrets add -url <URL> -model <M> -alias <name>", "Register a key for any provider endpoint"],
              ["zencoder-secrets list", "List all registered keys (values masked)"],
              ["zencoder-secrets test -provider <P> -alias <name>", "Send a probe to verify the key works"],
              ["zencoder-secrets delete -provider <P>", "Remove all keys for a provider"],
              ["zencoder-secrets delete -provider <P> -alias <name>", "Remove a specific key by alias"],
              ["zencoder-secrets migrate", "Migrate keys to the new multi-key pool format"],
            ].map(([cmd, desc], i) => (
              <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/20">
                <td className="px-4 py-3 font-mono text-xs text-primary">{cmd}</td>
                <td className="px-4 py-3 text-muted-foreground">{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CodeBlock
        language="bash"
        code={`# Add a key — you will be prompted to enter it securely (input is masked)
# Syntax: zencoder-secrets add -url <provider-base-url> -model <model-id> -alias <name>

# NVIDIA NIM (free tier — no credit card required)
zencoder-secrets add -url https://integrate.api.nvidia.com/v1 \\
  -model nemotron-3-nano-30b-a3b \\
  -alias nvidia-key1
# → Enter API key for nvidia (alias: nvidia-key1): [hidden]
# → BYOK provider registered.

# Anthropic
zencoder-secrets add -url https://api.anthropic.com \\
  -model claude-3-haiku-4-5-20251001 \\
  -alias prod
# → Enter API key for anthropic (alias: prod): [hidden]
# → BYOK provider registered.

# List keys (values masked)
zencoder-secrets list
# → nvidia     nvidia-key1  nvapi-...●●●●  model=nemotron-3-nano-30b-a3b  [available]
# → anthropic  prod         sk-ant-...●●●● model=claude-3-haiku-...        [available]

# Test a key
zencoder-secrets test -provider nvidia -alias nvidia-key1
# → OK: nvidia is reachable.`}
        title="zencoder-secrets usage"
      />

      <Callout type="info">
        Keys are stored in <code className="font-mono text-sm">~/.zencoder/secrets/</code>.
        The file is encrypted — never commit it to version control.
      </Callout>

      {/* Per-provider setup cards */}
      <DocHeading level={2}>Provider setup cards</DocHeading>

      <div className="space-y-12">
        {providers.map((p) => (
          <div
            key={p.id}
            id={p.id}
            className={`rounded-2xl border p-6 scroll-mt-20 ${
              p.id === "ollama" ? "border-green-500/30 bg-green-500/5" :
              p.id === "nvidia" ? "border-primary/30 bg-primary/5" :
              "border-border"
            }`}
          >
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <h3 className="text-xl font-bold text-foreground">{p.name}</h3>
              <Badge variant={p.type === "Local" ? "success" : "default"}>
                {p.type}
              </Badge>
              {p.free && <Badge variant="success">Free tier</Badge>}
              {p.id === "ollama" && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/15 text-green-400 border border-green-500/20 font-semibold">
                  ★ pre-loaded — no key needed
                </span>
              )}
              {p.id === "nvidia" && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/20 font-semibold">
                  ★ free API key at build.nvidia.com/models
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-1.5 mb-5">
              {p.models.map((m) => (
                <span
                  key={m}
                  className="px-2 py-0.5 rounded-full border border-border text-xs font-mono text-muted-foreground"
                >
                  {m}
                </span>
              ))}
            </div>

            <StepList steps={p.steps} />
          </div>
        ))}
      </div>

      <NextStep href="/docs/agent" label="Agent Mode — multi-step autonomous coding" />
    </DocsLayout>
  )
}
