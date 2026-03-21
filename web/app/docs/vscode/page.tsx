import { DocsLayout } from "@/components/blocks/docs-layout"
import { CodeBlock, StepList, Callout, DocHeading, NextStep, Kbd, Badge } from "@/components/blocks/doc-ui"
import Image from "next/image"

const shortcuts = [
  { keys: "Enter", action: "Send message" },
  { keys: "Shift+Enter", action: "New line in message (without sending)" },
  { keys: "Ctrl+U", action: "Clear the input field" },
  { keys: "Cmd+Shift+P", action: "Open Command Palette → type ZenCoder: Chat" },
]

export default function VscodePage() {
  return (
    <DocsLayout activePath="/docs/vscode">
      <DocHeading level={1}>VSCode Extension</DocHeading>
      <p className="text-lg text-muted-foreground mb-8">
        ZenCoder&apos;s VSCode extension gives you a streaming chat panel, file context management,
        and model switching — all without leaving your editor.
      </p>

      <Callout type="tip">
        After installing the extension, press <code className="font-mono text-sm">Cmd+Shift+P</code> (macOS) or{" "}
        <code className="font-mono text-sm">Ctrl+Shift+P</code> (Windows/Linux), type{" "}
        <strong className="text-foreground">ZenCoder AI Chat</strong>, and press Enter to open the chat panel.
      </Callout>

      {/* ── Screenshot ── */}
      <div className="my-8 flex justify-center">
        <div className="rounded-2xl border border-border overflow-hidden shadow-xl shadow-black/30 max-w-sm w-full">
          <Image
            src="/screenshots/vscode-screenshot.png"
            alt="ZenCoder Chat panel in VS Code"
            width={480}
            height={640}
            className="w-full h-auto"
          />
        </div>
      </div>

      {/* ── Chat panel UI ── */}
      <DocHeading level={2}>Chat panel UI walkthrough</DocHeading>

      <div className="space-y-4 text-muted-foreground">
        <div className="rounded-xl border border-border overflow-hidden">
          {[
            { area: "Model dropdown (top-left)", desc: "Switch between available models. Displays all models returned by GET /models from the daemon." },
            { area: "Routing dropdown (Auto/Local/Cloud)", desc: "Controls which models ZenCoder routes to. See guidance below." },
            { area: "Mode dropdown (Ask/Agent/Plan)", desc: "Ask = single-turn. Plan = show steps before executing. Agent = full agentic loop." },
            { area: "Message area", desc: "Streamed markdown responses. Code blocks are syntax-highlighted." },
            { area: "+ (attach) button", desc: "Add files or entire folders to the context window. Context size shown at the bottom." },
            { area: "Clear all (in + menu)", desc: "Clears all attached context items immediately. Type /clear in chat to also reset the conversation history." },
            { area: "Send button / Enter×2", desc: "Sends the current message with all attached context." },
            { area: "Disclaimer bar (bottom)", desc: "🔒 No data stored · ⚠️ Free APIs may log prompts · 🤖 AI can make mistakes" },
          ].map((row) => (
            <div key={row.area} className="flex flex-col sm:flex-row border-b border-border last:border-0">
              <div className="sm:w-64 flex-shrink-0 px-4 py-3 font-medium text-foreground text-sm bg-muted/20 sm:border-r border-border">
                {row.area}
              </div>
              <div className="px-4 py-3 text-sm">{row.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Routing mode ── */}
      <DocHeading level={2}>Choosing the right routing mode</DocHeading>
      <p className="text-muted-foreground mb-4">
        The <strong className="text-foreground">routing dropdown</strong> in the chat panel controls which models ZenCoder sends your request to.
        Pick the mode that matches the model you have selected.
      </p>
      <div className="rounded-xl border border-border overflow-hidden mb-6">
        {[
          {
            mode: "Auto",
            when: "You want ZenCoder to decide",
            detail: "Tries your selected model first. Falls back to the next available model if it's unreachable. Good default for most users.",
          },
          {
            mode: "Local",
            when: "You have selected an Ollama or LM Studio model",
            detail: "Routes only to locally-running models (Ollama / LM Studio). Never makes an outbound network call. Use this when working offline or for privacy-sensitive code.",
          },
          {
            mode: "Cloud",
            when: "You have selected a cloud model (NVIDIA NIM, Anthropic, OpenAI, etc.)",
            detail: "Routes only to cloud providers. Requires a key registered via zencoder-secrets. Use this when you need a larger or more capable model.",
          },
        ].map((row) => (
          <div key={row.mode} className="flex flex-col sm:flex-row border-b border-border last:border-0">
            <div className="sm:w-24 flex-shrink-0 px-4 py-3 font-bold text-foreground text-sm bg-muted/20 sm:border-r border-border flex items-center">
              {row.mode}
            </div>
            <div className="flex-1 px-4 py-3 text-sm">
              <p className="text-foreground font-medium mb-0.5">{row.when}</p>
              <p className="text-muted-foreground">{row.detail}</p>
            </div>
          </div>
        ))}
      </div>
      <Callout type="tip">
        If you pick a <strong className="text-foreground">Local</strong> model from the model dropdown, set routing to <strong className="text-foreground">Local</strong>.
        If you pick a <strong className="text-foreground">Cloud</strong> model, set routing to <strong className="text-foreground">Cloud</strong>.
        Use <strong className="text-foreground">Auto</strong> when you want ZenCoder to handle failover automatically.
      </Callout>

      {/* ── Context management ── */}
      <DocHeading level={2}>Context management</DocHeading>
      <p className="text-muted-foreground mb-4">
        Add files and folders to give ZenCoder precise context about your codebase.
      </p>

      <StepList
        steps={[
          {
            title: "Add a file",
            content: (
              <p>
                Click the <strong className="text-foreground">+</strong> button → <strong className="text-foreground">Add File</strong> →
                select a file. It appears as a chip in the context bar. The context size updates at the bottom.
              </p>
            ),
          },
          {
            title: "Add a folder",
            content: (
              <p>
                Click <strong className="text-foreground">+</strong> → <strong className="text-foreground">Add Folder</strong>.
                ZenCoder scans the folder and adds all relevant source files respecting{" "}
                <code className="font-mono text-sm">zenCoder.maxContextBytes</code>.
              </p>
            ),
          },
          {
            title: "Clear context & session history",
            content: (
              <>
                <p>
                  Click <strong className="text-foreground">+</strong> → <strong className="text-foreground">Clear all</strong> to remove all attached context items.
                </p>
                <p className="mt-2">
                  To also clear the conversation history, type <code className="font-mono text-sm">/clear</code> in the chat input and send it — this resets the session so the model starts fresh with no prior messages.
                </p>
              </>
            ),
          },
        ]}
      />

      <Callout type="info">
        Context items are persisted to <code className="font-mono text-sm">.zencoder/chat/context.json</code> per workspace,
        so they survive VSCode restarts.
      </Callout>

      {/* ── Keyboard shortcuts ── */}
      <DocHeading level={2}>Keyboard shortcuts</DocHeading>
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/40">
              <th className="text-left px-4 py-3 font-semibold">Shortcut</th>
              <th className="text-left px-4 py-3 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {shortcuts.map(({ keys, action }, i) => (
              <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/20">
                <td className="px-4 py-3"><Kbd>{keys}</Kbd></td>
                <td className="px-4 py-3 text-muted-foreground">{action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── VSCode settings ── */}
      <DocHeading level={2}>VSCode settings</DocHeading>
      <p className="text-muted-foreground mb-4">
        Configure via <Kbd>Cmd+,</Kbd> → search <code className="font-mono text-sm">ZenCoder</code>.
      </p>
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/40">
              <th className="text-left px-4 py-3 font-semibold">Setting</th>
              <th className="text-left px-4 py-3 font-semibold">Default</th>
              <th className="text-left px-4 py-3 font-semibold">Description</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["zenCoder.agentAddress", "http://127.0.0.1:7777", "Daemon address"],
              ["zenCoder.maxMessages", "100", "Chat history size"],
              ["zenCoder.maxContextBytes", "200000", "Max context per request"],
              ["zenCoder.autoDetectSkills", "true", "Auto-apply AI skills"],
            ].map(([key, def, desc], i) => (
              <tr key={i} className="border-b border-border last:border-0">
                <td className="px-4 py-3 font-mono text-xs text-primary">{key}</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{def}</td>
                <td className="px-4 py-3 text-muted-foreground text-xs">{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DocHeading level={2}>Session management</DocHeading>
      <p className="text-muted-foreground mb-2">
        Sessions are stored in <code className="font-mono text-sm">.zencoder/chat/</code> per workspace.
      </p>
      <CodeBlock
        language="bash"
        code={`ls .zencoder/chat/
# session.jsonl       — conversation history (capped at maxMessages)
# session-meta.json   — selected model
# context.json        — current context items
# exports/            — markdown exports`}
      />

      <NextStep href="/docs/agent" label="Agent Mode — multi-step autonomous coding" />
    </DocsLayout>
  )
}
