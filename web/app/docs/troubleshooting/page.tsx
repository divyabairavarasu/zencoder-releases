import { DocsLayout } from "@/components/blocks/docs-layout"
import { CodeBlock, Callout, DocHeading, Badge } from "@/components/blocks/doc-ui"

const issues = [
  {
    id: "daemon-not-running",
    symptom: "Connection refused / daemon not reachable",
    cause: "zencoderd is not running, or is listening on a different address.",
    fix: (
      <>
        <p>Start the daemon in a separate terminal:</p>
        <CodeBlock language="bash" code={`zencoderd\n# → ZenCoder daemon listening on :7777`} />
        <p>If you changed the address, set the env var in every terminal that runs the CLI or VSCode:</p>
        <CodeBlock language="bash" code={`export ZENCODER_ADDR=http://myhost:8888\nzencoder health`} />
      </>
    ),
  },
  {
    id: "no-models",
    symptom: "No models appear in dropdown / zencoder models returns empty",
    cause: "Ollama isn't running, or no models have been pulled.",
    fix: (
      <>
        <CodeBlock
          language="bash"
          code={`# Check Ollama is running
curl http://localhost:11434/api/tags

# Pull a model
ollama pull qwen2.5-coder:7b

# Verify the daemon can see it
zencoder models`}
        />
        <p>If you&apos;re using LM Studio, make sure the Local Server is started in the app.</p>
      </>
    ),
  },
  {
    id: "cloud-models-not-loading",
    symptom: "Cloud models (:cloud) not loading / pull fails with auth error",
    cause: "Ollama cloud models require a signed-in Ollama account (v0.12+).",
    fix: (
      <>
        <p>Sign in to your Ollama account — ZenCoder handles the rest automatically:</p>
        <CodeBlock
          language="bash"
          code={`# One-time sign-in (creates an account if needed)
ollama signin

# Restart ZenCoder — cloud models will be auto-pulled and launched
zencoder models`}
        />
        <Callout type="info">
          This only applies to models with the <code className="font-mono text-sm">:cloud</code> tag.
          Local models (e.g. <code className="font-mono text-sm">qwen2.5-coder:7b</code>) do not require sign-in.
          Make sure you are running Ollama v0.12 or later — run <code className="font-mono text-sm">ollama --version</code> to check.
        </Callout>
      </>
    ),
  },
  {
    id: "first-request-slow",
    symptom: "First response takes 30–60 seconds",
    cause: "The local model is being loaded into memory for the first time.",
    fix: (
      <>
        <p>
          This is normal. Ollama keeps the model hot in memory after the first load.
          Subsequent requests will be much faster. Try a short warm-up:
        </p>
        <CodeBlock language="bash" code={`zencoder chat "hi"  # warms up the model`} />
      </>
    ),
  },
  {
    id: "vscode-host-not-opening",
    symptom: "VS Code panel doesn't show after installing the extension",
    cause: "The extension may not have activated yet, or the command palette is the fastest way to open it.",
    fix: (
      <>
        <p>
          Press <code className="font-mono text-sm">Cmd+Shift+P</code> (macOS) or <code className="font-mono text-sm">Ctrl+Shift+P</code> (Windows/Linux),
          type <strong className="text-foreground">ZenCoder AI Chat</strong>, and press Enter.
        </p>
        <p className="text-sm mt-2">If the command doesn&apos;t appear, try reloading VS Code with <code className="font-mono text-sm">Cmd+Shift+P</code> → <strong className="text-foreground">Developer: Reload Window</strong>.</p>
      </>
    ),
  },
  {
    id: "byok-invalid-key",
    symptom: "zencoder-secrets test returns 401 / unauthorized",
    cause: "The API key is wrong, expired, or doesn't have the required permissions.",
    fix: (
      <>
        <p>Remove the key and re-add it, then test again:</p>
        <CodeBlock
          language="bash"
          code={`# Remove the key
zencoder-secrets delete -provider anthropic

# Re-add it (you will be prompted to enter it securely)
zencoder-secrets add-byok --provider anthropic --name prod --model claude-3-haiku-4-5-20251001

# Test it
zencoder-secrets test -provider anthropic`}
        />
        <Callout type="info">
          Anthropic keys start with <code className="font-mono text-sm">sk-ant-</code>. OpenAI keys start with{" "}
          <code className="font-mono text-sm">sk-</code> or <code className="font-mono text-sm">sk-proj-</code>.
          NVIDIA NIM keys start with <code className="font-mono text-sm">nvapi-</code>.
        </Callout>
      </>
    ),
  },
  {
    id: "context-too-large",
    symptom: "Context size warning / request rejected",
    cause: "The combined size of added files exceeds zenCoder.maxContextBytes.",
    fix: (
      <>
        <p>Clear some context items, or raise the limit in VSCode settings:</p>
        <CodeBlock
          language="json"
          code={`// .vscode/settings.json
{
  "zenCoder.maxContextBytes": 400000
}`}
        />
        <p>Alternatively, add individual files rather than whole folders.</p>
      </>
    ),
  },
  {
    id: "agent-infinite-loop",
    symptom: "Agent mode keeps iterating without finishing",
    cause: "The task is too broad, or the model is confused and repeating steps.",
    fix: (
      <>
        <p>
          Hit <strong className="text-foreground">Ctrl+C</strong> to stop the agent, then restart with a more specific task
          and a lower <code className="font-mono text-sm">--max-iter</code> limit:
        </p>
        <CodeBlock
          language="bash"
          code={`> /mode agent --max-iter 5 "Add nil check to the GetUser handler in internal/server/handlers.go"`}
        />
        <p className="text-sm">Keep tasks scoped to a single file or function for best results.</p>
      </>
    ),
  },
  {
    id: "secrets-file-permissions",
    symptom: "permission denied reading ~/.zencoder/secrets/",
    cause: "The secrets directory has wrong permissions.",
    fix: (
      <CodeBlock
        language="bash"
        code={`chmod 700 ~/.zencoder/secrets/
chmod 600 ~/.zencoder/secrets/*`}
      />
    ),
  },
  {
    id: "model-picker-no-tty",
    symptom: "/model interactive picker shows 'requires a TTY'",
    cause: "You're running zencoder in a non-interactive shell (e.g. piped input, CI).",
    fix: (
      <>
        <p>The interactive picker requires a terminal. Run <code className="font-mono text-sm">zencoder</code> directly in your terminal, then use:</p>
        <CodeBlock language="bash" code={`> /model\n# ↑↓ to navigate · Enter to select`} />
      </>
    ),
  },
]

export default function TroubleshootingPage() {
  return (
    <DocsLayout activePath="/docs/troubleshooting">
      <DocHeading level={1}>Troubleshooting</DocHeading>
      <p className="text-lg text-muted-foreground mb-8">
        Common issues and how to fix them. If none of these help, check the daemon logs
        with <code className="font-mono text-sm">ZENCODER_LOG_LEVEL=debug zencoderd</code>.
      </p>

      {/* Quick index */}
      <div className="flex flex-wrap gap-2 mb-10">
        {issues.map((issue) => (
          <a
            key={issue.id}
            href={`#${issue.id}`}
            className="px-3 py-1 rounded-full border border-border text-xs text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
          >
            {issue.symptom.slice(0, 40)}…
          </a>
        ))}
      </div>

      {/* Issue entries */}
      <div className="space-y-12">
        {issues.map((issue) => (
          <div key={issue.id} id={issue.id} className="scroll-mt-20">
            <div className="flex items-start gap-3 mb-3">
              <Badge variant="warning">Issue</Badge>
              <h2 className="text-lg font-bold text-foreground leading-snug">{issue.symptom}</h2>
            </div>
            <div className="pl-0">
              <p className="text-sm text-muted-foreground mb-3">
                <strong className="text-foreground">Cause:</strong> {issue.cause}
              </p>
              <div className="text-muted-foreground text-sm space-y-2">{issue.fix}</div>
            </div>
            <hr className="border-border mt-8" />
          </div>
        ))}
      </div>

    </DocsLayout>
  )
}
