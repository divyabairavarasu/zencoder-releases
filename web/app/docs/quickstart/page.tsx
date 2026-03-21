import { DocsLayout } from "@/components/blocks/docs-layout"
import { CodeBlock, StepList, Callout, DocHeading, NextStep, Badge } from "@/components/blocks/doc-ui"

export default function QuickStartPage() {
  return (
    <DocsLayout activePath="/docs/quickstart">
      <DocHeading level={1}>Quick Start</DocHeading>
      <p className="text-lg text-muted-foreground mb-8">
        Get ZenCoder running in under 5 minutes. Connect a local model and send your first chat.
      </p>

      <Callout type="tip">
        ZenCoder works best with a local model (Ollama or LM Studio) — zero API keys, zero cost.
        You can add cloud keys later with <code className="font-mono text-sm">zencoder-secrets</code>.
      </Callout>

      {/* ── Pre-install: macOS ── */}
      <DocHeading level={2}>Pre-install: macOS setup</DocHeading>
      <p className="text-muted-foreground mb-4">
        Install the tools ZenCoder uses as its AI backends.
      </p>

      <DocHeading level={3}>1. Install Ollama (local AI, free)</DocHeading>
      <StepList
        steps={[
          {
            title: "Download Ollama",
            content: (
              <>
                <p>Go to <strong className="text-foreground">ollama.com</strong> and download the macOS app, or use Homebrew:</p>
                <CodeBlock language="bash" code={`brew install ollama`} />
              </>
            ),
          },
          {
            title: "Start the Ollama service",
            content: (
              <>
                <p>Ollama runs as a background service on <code className="font-mono text-sm">localhost:11434</code>.</p>
                <CodeBlock language="bash" code={`ollama serve`} title="Terminal 1" />
                <Callout type="info">On macOS, the Ollama app starts this automatically after install.</Callout>
              </>
            ),
          },
          {
            title: "Pull a coding model",
            content: (
              <>
                <p>We recommend one of these for coding tasks:</p>
                <CodeBlock
                  language="bash"
                  code={`# Recommended: fast, great for code
ollama pull qwen2.5-coder:7b

# Alternative: general purpose
ollama pull llama3

# Verify it downloaded
ollama list`}
                />
                <p className="text-sm">Expected output: model appears in the list with its size.</p>
              </>
            ),
          },
          {
            title: "Verify Ollama is running",
            content: (
              <CodeBlock
                language="bash"
                code={`curl http://localhost:11434/api/tags
# → {"models":[{"name":"qwen2.5-coder:7b",...}]}`}
              />
            ),
          },
        ]}
      />

      <DocHeading level={3}>2. Install LM Studio (optional alternative)</DocHeading>
      <p className="text-muted-foreground mb-4">
        LM Studio is a GUI app that runs local models and exposes an OpenAI-compatible API.
      </p>
      <StepList
        steps={[
          {
            title: "Download LM Studio",
            content: (
              <p>
                Download from <strong className="text-foreground">lmstudio.ai</strong> — macOS, Windows, and Linux supported.
                Install the <code className="font-mono text-sm">.dmg</code> as you would any Mac app.
              </p>
            ),
          },
          {
            title: "Download a model",
            content: (
              <p>
                Open LM Studio → search for <strong className="text-foreground">Qwen2.5-Coder</strong> or <strong className="text-foreground">Mistral 7B</strong> →
                click Download. Models are stored in <code className="font-mono text-sm">~/.cache/lm-studio/models/</code>.
              </p>
            ),
          },
          {
            title: "Start the local server",
            content: (
              <>
                <p>In LM Studio: <strong className="text-foreground">Local Server</strong> tab → select model → <strong className="text-foreground">Start Server</strong>.</p>
                <p>The server listens on <code className="font-mono text-sm">http://localhost:1234/v1</code> (OpenAI-compatible).</p>
              </>
            ),
          },
        ]}
      />

      {/* ── Install ZenCoder ── */}
      <DocHeading level={2}>Install ZenCoder</DocHeading>
      <p className="text-muted-foreground mb-6">
        Choose how you want to use ZenCoder — the CLI tools or the VS Code chat extension (or both).
      </p>

      <DocHeading level={3}>Option 1 — CLI &amp; zencoder-secrets</DocHeading>
      <p className="text-muted-foreground mb-4">
        Installs the <code className="font-mono text-sm">zencoder</code> CLI and <code className="font-mono text-sm">zencoder-secrets</code> in one step.
        Works on macOS, Linux, and Windows WSL2.
      </p>
      <CodeBlock
        language="bash"
        code={`curl -fsSL https://raw.githubusercontent.com/divyabairavarasu/zencoder-releases/main/install.sh | bash`}
      />
      <Callout type="info">
        The install script places binaries in <code className="font-mono text-sm">~/.local/bin</code> (or your <code className="font-mono text-sm">$GOPATH/bin</code> if Go is available).
        Make sure that directory is on your <code className="font-mono text-sm">PATH</code>.
      </Callout>

      <StepList
        steps={[
          {
            title: "Open the REPL",
            content: (
              <>
                <CodeBlock language="bash" code={`zencoder`} />
                <p className="text-sm">You&apos;ll see the ZenCoder banner and a <code className="font-mono text-sm">&gt;</code> prompt. Type a question and press Enter twice to send.</p>
                <CodeBlock
                  language="text"
                  code={`> What does this code do?
|
ZenCoder: This code defines an HTTP server that...`}
                />
              </>
            ),
          },
          {
            title: "Check health",
            content: (
              <CodeBlock
                language="bash"
                code={`zencoder health
# → ZenCoder: service status is ok. Model: ollama/qwen2.5-coder:7b`}
              />
            ),
          },
        ]}
      />

      <DocHeading level={3}>Option 2 — VS Code Chat Extension</DocHeading>
      <p className="text-muted-foreground mb-4">
        Get AI chat, inline completions, and context-aware suggestions directly inside VS Code.
      </p>
      <div className="rounded-xl border border-border bg-muted/20 p-5 mb-6">
        <p className="font-semibold text-foreground mb-1">Zencoder AI</p>
        <p className="text-sm text-muted-foreground">
          Search for <strong className="text-foreground">Zencoder AI</strong> in the VS Code Extensions panel (<code className="font-mono text-xs">Ctrl+Shift+X</code> / <code className="font-mono text-xs">Cmd+Shift+X</code>) and click <strong className="text-foreground">Install</strong>.
        </p>
      </div>

      <Callout type="tip">
        After installing, press <code className="font-mono text-sm">Cmd+Shift+P</code> (macOS) or <code className="font-mono text-sm">Ctrl+Shift+P</code> (Windows/Linux),
        type <strong>ZenCoder AI Chat</strong>, and press Enter to open the chat panel and start using it.
      </Callout>

      {/* ── zencoder-secrets ── */}
      <DocHeading level={2}>Add cloud API keys with zencoder-secrets <span className="text-base font-normal text-muted-foreground">(optional)</span></DocHeading>
      <p className="text-muted-foreground mb-4">
        <code className="font-mono text-sm">zencoder-secrets</code> is installed automatically alongside the CLI.
        It is the most secure way to add your own cloud API keys — every key is stored encrypted on your local machine and <strong className="text-foreground">never leaves your device</strong>.
      </p>

      <Callout type="tip">
        No cloud keys are required. ZenCoder works fully offline with Ollama or LM Studio.
        Use <code className="font-mono text-sm">zencoder-secrets</code> only when you want to unlock a specific cloud model.
      </Callout>

      <DocHeading level={3}>How it works</DocHeading>
      <p className="text-muted-foreground mb-4">
        You register a provider endpoint and model once. ZenCoder handles routing — you just pick the model in the REPL.
      </p>
      <CodeBlock
        language="bash"
        code={`# General syntax
zencoder-secrets add -url <provider-base-url> -model <model-id> -alias <your-key-name>
# → Enter API key: [hidden — input is masked]
# → BYOK provider registered.`}
      />

      <DocHeading level={3}>NVIDIA NIM — featured example</DocHeading>
      <p className="text-muted-foreground mb-3">
        NVIDIA NIM provides free API access to top-tier models including Llama, Mistral, and Nemotron.
        Sign up at <strong className="text-foreground">build.nvidia.com</strong> to get a free key (no credit card required).
      </p>
      <CodeBlock
        language="bash"
        code={`# Add an NVIDIA NIM key
zencoder-secrets add -url https://integrate.api.nvidia.com/v1 \\
  -model nemotron-3-nano-30b-a3b \\
  -alias nvidia-key1
# → Enter API key for nvidia (alias: nvidia-key1): [hidden]
# → BYOK provider registered.
# → Example model: nvidia/nemotron-3-nano-30b-a3b

# Add more keys for different models (ZenCoder load-balances across them)
zencoder-secrets add -url https://integrate.api.nvidia.com/v1 \\
  -model llama-3.3-70b-instruct \\
  -alias nvidia-key2

# Verify your keys
zencoder-secrets list

# Test a key is working
zencoder-secrets test -provider nvidia -alias nvidia-key1`}
      />
      <Callout type="info">
        Once registered, pick the model inside the ZenCoder REPL with <code className="font-mono text-sm">/model</code> and select your NVIDIA model from the list.
      </Callout>

      <DocHeading level={3}>Managing keys</DocHeading>
      <div className="overflow-x-auto rounded-xl border border-border mb-8">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/40">
              <th className="text-left px-4 py-3 font-semibold">Command</th>
              <th className="text-left px-4 py-3 font-semibold">What it does</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["zencoder-secrets add -url <URL> -model <M> -alias <name>", "Register a key for any provider endpoint"],
              ["zencoder-secrets list", "List all registered keys (values masked)"],
              ["zencoder-secrets test -provider <P> -alias <name>", "Send a probe request to verify the key works"],
              ["zencoder-secrets delete -provider <P>", "Remove all keys for a provider"],
              ["zencoder-secrets delete -provider <P> -alias <name>", "Remove a specific key by alias"],
            ].map(([cmd, desc], i) => (
              <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                <td className="px-4 py-3 font-mono text-xs text-primary break-all">{cmd}</td>
                <td className="px-4 py-3 text-muted-foreground">{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Callout type="tip">
        Press Enter twice to send a message (single Enter adds a new line — useful for code blocks).
        Type <code className="font-mono text-sm">/help</code> to see all slash commands.
      </Callout>

      <DocHeading level={2}>Essential slash commands</DocHeading>
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/40">
              <th className="text-left px-4 py-3 font-semibold">Command</th>
              <th className="text-left px-4 py-3 font-semibold">What it does</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["/help", "Show all available commands"],
              ["/model", "Open interactive model picker (arrow keys to navigate)"],
              ["/model ollama/llama3", "Switch to a specific model immediately"],
              ["/models", "Alias for /model"],
              ["/clear", "Reset the current session's conversation history"],
              ["/quit", "Exit the REPL"],
              ["/byok url=<URL> key=<KEY>", "Register a custom BYOK endpoint"],
            ].map(([cmd, desc], i) => (
              <tr
                key={i}
                className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
              >
                <td className="px-4 py-3 font-mono text-xs text-primary">{cmd}</td>
                <td className="px-4 py-3 text-muted-foreground">{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <NextStep href="/docs/cli" label="CLI Reference — every command and flag" />
    </DocsLayout>
  )
}
