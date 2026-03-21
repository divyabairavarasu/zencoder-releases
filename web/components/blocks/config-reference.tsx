"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface ConfigKey {
  key: string
  default: string
  description: string
  example: string
}

const configs: ConfigKey[] = [
  {
    key: "ZENCODER_ADDR",
    default: "127.0.0.1:7777",
    description: "Daemon listen address",
    example: "0.0.0.0:7777",
  },
  {
    key: "ZENCODER_MODEL",
    default: "llama3",
    description: "Default model for chat requests",
    example: "mistral:latest",
  },
  {
    key: "ZENCODER_LOG_LEVEL",
    default: "info",
    description: "Log verbosity (debug | info | warn | error)",
    example: "debug",
  },
  {
    key: "ZENCODER_MAX_CONTEXT_BYTES",
    default: "131072",
    description: "Maximum context window in bytes",
    example: "262144",
  },
  {
    key: "ZENCODER_AUDIT_PATH",
    default: "~/.zencoder/audit.jsonl",
    description: "Path for append-only audit log",
    example: "/var/log/zencoder/audit.jsonl",
  },
  {
    key: "ZENCODER_CASCADE_ENABLED",
    default: "true",
    description: "Enable automatic cascade model routing",
    example: "false",
  },
  {
    key: "ZENCODER_BYOK_ENCRYPT",
    default: "true",
    description: "Encrypt BYOK API keys at rest (AES-256-GCM)",
    example: "true",
  },
  {
    key: "ZENCODER_SESSION_MAX",
    default: "100",
    description: "Maximum messages retained in session history",
    example: "200",
  },
  {
    key: "ZENCODER_READ_TIMEOUT",
    default: "30s",
    description: "HTTP request read timeout",
    example: "60s",
  },
  {
    key: "ZENCODER_MAX_BODY_BYTES",
    default: "1048576",
    description: "Maximum request body size (1 MB default)",
    example: "4194304",
  },
]

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }

  return (
    <button
      onClick={handleCopy}
      className="p-1 rounded hover:bg-muted/60 transition-colors text-muted-foreground hover:text-foreground"
      aria-label="Copy value"
    >
      {copied ? (
        <Check className="w-3.5 h-3.5 text-green-500" />
      ) : (
        <Copy className="w-3.5 h-3.5" />
      )}
    </button>
  )
}

export function ConfigReference() {
  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold mb-3 text-center">
        Configuration Reference
      </h2>
      <p className="text-muted-foreground text-center mb-10">
        All environment variables supported by the ZenCoder daemon.
      </p>

      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/40">
              <th className="text-left px-4 py-3 font-semibold">Key</th>
              <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">
                Default
              </th>
              <th className="text-left px-4 py-3 font-semibold">Description</th>
              <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">
                Example
              </th>
            </tr>
          </thead>
          <tbody>
            {configs.map((c, i) => (
              <tr
                key={c.key}
                className={cn(
                  "border-b border-border last:border-0 hover:bg-muted/20 transition-colors",
                  i % 2 === 0 ? "" : "bg-muted/10"
                )}
              >
                <td className="px-4 py-3">
                  <code className="text-xs font-mono font-semibold text-primary">
                    {c.key}
                  </code>
                </td>
                <td className="px-4 py-3 hidden sm:table-cell">
                  <div className="flex items-center gap-1">
                    <code className="text-xs font-mono text-muted-foreground">
                      {c.default}
                    </code>
                    <CopyButton value={c.default} />
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground text-xs">
                  {c.description}
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <div className="flex items-center gap-1">
                    <code className="text-xs font-mono text-foreground/70">
                      {c.example}
                    </code>
                    <CopyButton value={c.example} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
