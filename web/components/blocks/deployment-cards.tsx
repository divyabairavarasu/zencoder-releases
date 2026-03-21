"use client"

import { Terminal, MessageSquare, Copy, CheckCircle } from "lucide-react"
import { useState } from "react"

const INSTALL_CMD = "curl -fsSL https://raw.githubusercontent.com/divyabairavarasu/zencoder-releases/main/install.sh | bash"

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="flex-shrink-0 p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
      aria-label="Copy to clipboard"
    >
      {copied ? (
        <CheckCircle className="w-4 h-4 text-green-500" />
      ) : (
        <Copy className="w-4 h-4" />
      )}
    </button>
  )
}

export function DeploymentCards() {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold mb-3 text-center">
        Deployment Options
      </h2>
      <p className="text-muted-foreground text-center mb-10">
        Get ZenCoder running in seconds — pick your interface.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* CLI + Secrets */}
        <div className="rounded-2xl border border-primary bg-primary/5 shadow-lg shadow-primary/10 p-6 flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <Terminal className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-foreground">CLI &amp; Secrets</h3>
              <p className="text-xs text-muted-foreground">zencoder + zencoder-secrets, one command</p>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Install
            </p>
            <div className="flex items-center gap-2 bg-muted rounded-lg px-3 py-2 border border-border">
              <code className="text-xs text-foreground/90 font-mono flex-1 break-all">
                {INSTALL_CMD}
              </code>
              <CopyButton text={INSTALL_CMD} />
            </div>
          </div>

          <ul className="space-y-1.5">
            {[
              "Installs the zencoder CLI and zencoder-secrets",
              "Works on macOS, Linux & Windows WSL2",
              "No dependencies — single static binary",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-xs text-muted-foreground">
                <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* VSCode Chat */}
        <div className="rounded-2xl border border-border bg-muted/20 p-6 flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-foreground">Chat Extension</h3>
              <p className="text-xs text-muted-foreground">AI chat directly inside VS Code</p>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Install
            </p>
            <div className="rounded-lg border border-border bg-muted/30 px-4 py-3">
              <p className="text-sm text-foreground">
                Search for <strong>Zencoder AI</strong> in the VS Code Extensions panel
                (<code className="font-mono text-xs">Ctrl+Shift+X</code> / <code className="font-mono text-xs">Cmd+Shift+X</code>) and click <strong>Install</strong>.
              </p>
            </div>
          </div>

          <ul className="space-y-1.5">
            {[
              "Install directly from VS Code Marketplace",
              "Inline chat, completions & context-aware suggestions",
              "Works with any ZenCoder-compatible model",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-xs text-muted-foreground">
                <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
