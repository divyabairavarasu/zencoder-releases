import { CheckCircle, XCircle, AlertCircle, Lock } from "lucide-react"
import { cn } from "@/lib/utils"

type Status = "yes" | "no" | "partial"

interface Provider {
  name: string
  type: "Local" | "Cloud"
  streaming: Status
  byok: Status
  freeTier: Status
  protocol: string
  highlight?: string
}

const providers: Provider[] = [
  {
    name: "Ollama",
    type: "Local",
    streaming: "yes",
    byok: "no",
    freeTier: "yes",
    protocol: "OpenAI-compat",
    highlight: "pre-loaded",
  },
  {
    name: "LM Studio",
    type: "Local",
    streaming: "yes",
    byok: "no",
    freeTier: "yes",
    protocol: "OpenAI-compat",
  },
  {
    name: "NVIDIA NIM",
    type: "Cloud",
    streaming: "yes",
    byok: "yes",
    freeTier: "yes",
    protocol: "OpenAI-compat",
    highlight: "free key",
  },
  {
    name: "OpenAI",
    type: "Cloud",
    streaming: "yes",
    byok: "yes",
    freeTier: "partial",
    protocol: "OpenAI",
  },
  {
    name: "Anthropic",
    type: "Cloud",
    streaming: "yes",
    byok: "yes",
    freeTier: "no",
    protocol: "Anthropic",
  },
  {
    name: "Gemini",
    type: "Cloud",
    streaming: "yes",
    byok: "yes",
    freeTier: "yes",
    protocol: "Gemini",
  },
  {
    name: "Mistral",
    type: "Cloud",
    streaming: "yes",
    byok: "yes",
    freeTier: "partial",
    protocol: "OpenAI-compat",
  },
  {
    name: "Groq",
    type: "Cloud",
    streaming: "yes",
    byok: "yes",
    freeTier: "yes",
    protocol: "OpenAI-compat",
  },
  {
    name: "Cohere",
    type: "Cloud",
    streaming: "yes",
    byok: "yes",
    freeTier: "partial",
    protocol: "Cohere",
  },
  {
    name: "Together",
    type: "Cloud",
    streaming: "yes",
    byok: "yes",
    freeTier: "partial",
    protocol: "OpenAI-compat",
  },
  {
    name: "OpenRouter",
    type: "Cloud",
    streaming: "yes",
    byok: "yes",
    freeTier: "partial",
    protocol: "OpenAI-compat",
  },
]

function StatusIcon({ status }: { status: Status }) {
  if (status === "yes")
    return <CheckCircle className="w-4 h-4 text-green-500 mx-auto" />
  if (status === "no")
    return <XCircle className="w-4 h-4 text-red-500/70 mx-auto" />
  return <AlertCircle className="w-4 h-4 text-yellow-500 mx-auto" />
}

export function ProviderGrid() {
  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold mb-3 text-center">
        Provider Compatibility
      </h2>
      <p className="text-muted-foreground text-center mb-4">
        Every provider ZenCoder supports — with feature status at a glance.
      </p>

      {/* zencoder-secrets security callout */}
      <div className="max-w-2xl mx-auto mb-8 rounded-xl border border-primary/20 bg-primary/5 px-5 py-4 flex items-start gap-3">
        <Lock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-foreground mb-1">
            🔒 API keys stored with <code className="font-mono text-primary">zencoder-secrets</code> — AES-256-GCM encrypted
          </p>
          <p className="text-xs text-muted-foreground">
            Keys are encrypted at rest in <code className="font-mono text-xs">~/.zencoder/secrets/</code> and <strong>never sent to ZenCoder servers</strong>.
            One command: <code className="font-mono text-xs text-primary">zencoder-secrets add nvidia</code>
          </p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/40">
              <th className="text-left px-4 py-3 font-semibold text-foreground">
                Provider
              </th>
              <th className="text-center px-4 py-3 font-semibold text-foreground">
                Type
              </th>
              <th className="text-center px-4 py-3 font-semibold text-foreground">
                Streaming
              </th>
              <th className="text-center px-4 py-3 font-semibold text-foreground">
                BYOK
              </th>
              <th className="text-center px-4 py-3 font-semibold text-foreground">
                Free Tier
              </th>
              <th className="text-center px-4 py-3 font-semibold text-foreground">
                Protocol
              </th>
            </tr>
          </thead>
          <tbody>
            {providers.map((p, i) => (
              <tr
                key={p.name}
                className={cn(
                  "border-b border-border last:border-0 hover:bg-muted/20 transition-colors",
                  p.highlight ? "bg-primary/5" : i % 2 === 0 ? "" : "bg-muted/10"
                )}
              >
                <td className="px-4 py-3 font-medium text-foreground">
                  <span className="flex items-center gap-2">
                    {p.name}
                    {p.highlight && (
                      <span className={cn(
                        "text-[10px] font-semibold px-1.5 py-0.5 rounded-full",
                        p.highlight === "pre-loaded"
                          ? "bg-green-500/15 text-green-400 border border-green-500/20"
                          : "bg-primary/15 text-primary border border-primary/20"
                      )}>
                        {p.highlight === "pre-loaded" ? "★ pre-loaded" : "★ free key"}
                      </span>
                    )}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <span
                    className={cn(
                      "inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium",
                      p.type === "Local"
                        ? "bg-green-500/10 text-green-400"
                        : "bg-blue-500/10 text-blue-400"
                    )}
                  >
                    {p.type}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <StatusIcon status={p.streaming} />
                </td>
                <td className="px-4 py-3">
                  <StatusIcon status={p.byok} />
                </td>
                <td className="px-4 py-3">
                  <StatusIcon status={p.freeTier} />
                </td>
                <td className="px-4 py-3 text-center text-muted-foreground font-mono text-xs">
                  {p.protocol}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 justify-center mt-6 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <CheckCircle className="w-3.5 h-3.5 text-green-500" /> Supported
        </span>
        <span className="flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5 text-yellow-500" /> Partial
        </span>
        <span className="flex items-center gap-1.5">
          <XCircle className="w-3.5 h-3.5 text-red-500/70" /> Not available
        </span>
      </div>
    </div>
  )
}
