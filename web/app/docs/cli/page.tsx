import { DocsLayout } from "@/components/blocks/docs-layout"
import { CodeBlock, Callout, DocHeading, NextStep, Badge, Kbd } from "@/components/blocks/doc-ui"
import Image from "next/image"

// ── REPL slash commands sourced directly from cmd/zencoder/main.go ──────────
const replCommands = [
  {
    cmd: "/help",
    desc: "Show all available REPL commands",
    modes: ["chat", "agent"],
  },
  {
    cmd: "/model",
    desc: "Open the interactive model picker — navigate with arrow keys, press Enter to switch",
    modes: ["chat", "agent"],
    example: "/model",
  },
  {
    cmd: "/model <provider/name>",
    desc: "Switch directly to a specific model without the picker",
    modes: ["chat", "agent"],
    example: "/model anthropic/claude-3-haiku-4-5-20251001",
  },
  {
    cmd: "/models",
    desc: "Alias for /model — opens the interactive picker",
    modes: ["chat", "agent"],
  },
  {
    cmd: "/mode agent",
    desc: "Switch to Agent mode — gives ZenCoder file read/write tools to edit files autonomously",
    modes: ["chat"],
    highlight: true,
  },
  {
    cmd: "/mode chat",
    desc: "Switch back to Chat mode — stateless, no file access",
    modes: ["agent"],
  },
  {
    cmd: "/skills",
    desc: "List all available AI skill categories (code-review, refactor, debug, explain, …)",
    modes: ["chat", "agent"],
  },
  {
    cmd: "/clear",
    desc: "Clear conversation history for this session — starts fresh context",
    modes: ["chat", "agent"],
  },
  {
    cmd: "/health",
    desc: "Check daemon connectivity and currently active model",
    modes: ["chat", "agent"],
  },
  {
    cmd: "/version",
    desc: "Show CLI and daemon version",
    modes: ["chat", "agent"],
  },
  {
    cmd: "/quit",
    desc: "Exit the REPL",
    modes: ["chat", "agent"],
  },
]


export default function CliReferencePage() {
  return (
    <DocsLayout activePath="/docs/cli">
      <DocHeading level={1}>CLI Reference</DocHeading>
      <p className="text-lg text-muted-foreground mb-8">
        Every ZenCoder CLI command — syntax, flags, and examples. Plus the full list of
        REPL slash commands you can use mid-session.
      </p>

      <Callout type="info">
        All commands talk to the local daemon at <code className="font-mono text-sm">ZENCODER_ADDR</code>{" "}
        (default: <code className="font-mono text-sm">http://127.0.0.1:7777</code>).
        Start <code className="font-mono text-sm">zencoderd</code> first.
      </Callout>

      {/* ── REPL screenshot ── */}
      <DocHeading level={2}>Interactive REPL</DocHeading>
      <p className="text-muted-foreground mb-4">
        Run <code className="font-mono text-sm text-primary">zencoder</code> with no arguments to enter the interactive REPL.
        It auto-selects the best available model (Anthropic, Ollama, or whatever you have configured),
        shows token usage after each response, and lets you switch models without restarting.
      </p>

      {/* Real screenshot from the REPL */}
      <div className="my-6 rounded-xl overflow-hidden border border-border shadow-lg">
        <div className="flex items-center gap-2 px-4 py-2.5 bg-neutral-900 border-b border-neutral-800">
          <span className="w-3 h-3 rounded-full bg-red-500/80" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <span className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="ml-2 text-xs text-neutral-500 font-mono">zencoder — REPL chat</span>
        </div>
        <Image
          src="/screenshots/repl-chat.png"
          alt="ZenCoder REPL chat session showing a live question answered by claude-haiku with token metrics"
          width={1280}
          height={720}
          className="w-full"
          priority
        />
      </div>

      <p className="text-sm text-muted-foreground mb-8">
        ↑ Real session: <code className="font-mono text-xs">mode: auto · model: anthropic/claude-haiku-4-5-20251001</code>.
        Response streams token-by-token. Token usage (↑ sent · ↓ received) and latency shown at the bottom of each reply.
      </p>

      {/* ── REPL Slash Commands ── */}
      <DocHeading level={2} id="repl-commands">REPL slash commands</DocHeading>
      <p className="text-muted-foreground mb-2">
        Slash commands work in both <Badge variant="default">chat</Badge> and <Badge variant="default">agent</Badge> modes.
        They are only interpreted when typed at the start of an empty line — mid-message content is never treated as a command.
      </p>

      <Callout type="tip">
        <strong>Two key commands to remember:</strong>
        <br />
        <code className="font-mono text-sm">/model</code> — switch the AI model without leaving the session.
        <br />
        <code className="font-mono text-sm">/mode agent</code> — unlock file editing; ZenCoder can now read and write files in your workspace.
      </Callout>

      {/* /model detail */}
      <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 my-6">
        <h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
          <code className="font-mono text-primary text-base">/model</code>
          <span className="text-xs text-muted-foreground">— interactive model picker</span>
        </h3>
        <p className="text-sm text-muted-foreground mb-3">
          Opens a scrollable TUI list of every model available to the daemon. Navigate with arrow keys
          or <Kbd>j</Kbd> / <Kbd>k</Kbd>, press <Kbd>Enter</Kbd> to switch.
          The current model is marked <code className="font-mono text-xs">(current)</code>.
        </p>
        <CodeBlock
          language="bash"
          code={`> /model\n# Opens interactive picker:\n#   1  ollama/qwen2.5-coder:7b      (current)\n#   2  ollama/llama3.2:3b\n#   3  anthropic/claude-3-haiku-4-5  (cloud)\n#   4  nvidia/meta/llama-3.1-405b    (cloud)\n# ↑↓ or j/k to move · Enter to select · q to cancel\n\n# Or switch directly:\n> /model ollama/qwen2.5-coder:7b\nSwitched model to: ollama/qwen2.5-coder:7b`}
          title="/model — usage"
        />
      </div>

      {/* /mode agent detail */}
      <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-5 my-6">
        <h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
          <code className="font-mono text-green-300 text-base">/mode agent</code>
          <span className="text-xs text-muted-foreground">— enable file editing</span>
        </h3>
        <p className="text-sm text-muted-foreground mb-3">
          Switches the current session from stateless chat to full Agent mode. In agent mode ZenCoder has
          six workspace tools: <code className="font-mono text-xs">file_read</code>,{" "}
          <code className="font-mono text-xs">file_glob</code>,{" "}
          <code className="font-mono text-xs">workspace_search</code>,{" "}
          <code className="font-mono text-xs">list_directory</code>,{" "}
          <code className="font-mono text-xs">file_edit</code>, and{" "}
          <code className="font-mono text-xs">file_remove</code>.
        </p>
        <CodeBlock
          language="bash"
          code={`# Start in chat mode, then switch to agent mid-session\n> /mode agent\nSwitching to agent mode...\n\n> Add input validation to all POST handlers in internal/server/\n[Agent] Reading: internal/server/server.go\n[Agent] Reading: internal/server/handlers.go\n[Agent] Proposing edit to internal/server/handlers.go\n[Agent] Apply? (y/n): y\n[Agent] ✓ Edit applied\n\n# Switch back to chat when done\n> /mode chat`}
          title="/mode agent — editing files"
        />
      </div>

      {/* Full slash command table */}
      <div className="overflow-x-auto rounded-xl border border-border mb-8">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/40">
              <th className="text-left px-4 py-3 font-semibold w-64">Command</th>
              <th className="text-left px-4 py-3 font-semibold">What it does</th>
              <th className="text-left px-4 py-3 font-semibold w-32">Available in</th>
            </tr>
          </thead>
          <tbody>
            {replCommands.map((r, i) => (
              <tr
                key={i}
                className={`border-b border-border last:border-0 ${r.highlight ? "bg-green-500/5" : "hover:bg-muted/20"}`}
              >
                <td className="px-4 py-3 font-mono text-xs text-primary whitespace-nowrap">{r.cmd}</td>
                <td className="px-4 py-3 text-muted-foreground text-sm">{r.desc}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {r.modes.map((m) => (
                      <span
                        key={m}
                        className="text-[10px] px-1.5 py-0.5 rounded-full border border-border font-medium text-muted-foreground"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Skills section */}
      <DocHeading level={2} id="skills">Skills</DocHeading>
      <p className="text-muted-foreground mb-4">
        ZenCoder auto-detects the right skill for each conversation. Use{" "}
        <code className="font-mono text-sm text-primary">/skills</code> in the REPL to list all available categories,
        or run <code className="font-mono text-sm text-primary">zencoder skills</code> from the terminal.
      </p>
      <CodeBlock
        language="bash"
        code={`> /skills\n# Available skills:\n#   code-review       Analyse code for bugs, style, performance\n#   test-generation   Generate unit/integration tests\n#   refactor          Restructure code without changing behaviour\n#   debug             Diagnose and fix runtime errors\n#   explain           Plain-English explanation of code\n#   documentation     Generate docstrings and README sections\n#   security-audit    Identify security vulnerabilities\n#   architecture      High-level design and system diagrams\n#   generate          Generate new code from a spec`}
        title="/skills — in the REPL"
      />
      <Callout type="info">
        Skills are auto-detected from your prompt. You can also pin one with the{" "}
        <code className="font-mono text-sm">--skill</code> flag on the CLI:
        <code className="font-mono text-sm ml-2">zencoder chat --skill refactor &quot;Clean up this function&quot;</code>
      </Callout>

      <NextStep href="/docs/vscode" label="VSCode Extension Guide" />
    </DocsLayout>
  )
}
