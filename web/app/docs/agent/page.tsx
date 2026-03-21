import { DocsLayout } from "@/components/blocks/docs-layout"
import { CodeBlock, StepList, Callout, DocHeading, NextStep, Badge } from "@/components/blocks/doc-ui"

const agentTools = [
  { name: "file_read", desc: "Read the full contents of any file in the workspace", example: "Read internal/server/server.go" },
  { name: "file_glob", desc: "Find files matching a glob pattern (e.g. **/*.go)", example: "Find all test files in internal/" },
  { name: "workspace_search", desc: "Full-text search across the entire workspace", example: "Search for all uses of AppError" },
  { name: "list_directory", desc: "List directory contents recursively", example: "What's inside internal/llm/?" },
  { name: "file_edit", desc: "Apply a targeted diff/edit to a file", example: "Add error handling to auth middleware" },
  { name: "file_remove", desc: "Delete a file from the workspace", example: "Remove the deprecated utils_old.go" },
]

export default function AgentPage() {
  return (
    <DocsLayout activePath="/docs/agent">
      <DocHeading level={1}>Agent Mode</DocHeading>
      <p className="text-lg text-muted-foreground mb-8">
        Agent mode is ZenCoder&apos;s most powerful feature. Give it a natural-language task
        and it will autonomously read your code, reason about what to change, and apply precise edits —
        all within your workspace.
      </p>

      <Callout type="warning">
        Agent mode can modify files. Review proposed edits carefully before confirming.
        Use <code className="font-mono text-sm">--max-iter</code> to limit autonomous steps on complex tasks.
      </Callout>

      {/* ── How it works ── */}
      <DocHeading level={2}>How it works</DocHeading>
      <p className="text-muted-foreground mb-6">
        Agent mode uses a <strong className="text-foreground">ReAct loop</strong> — Reason, Act, Observe — until the task is complete or the iteration limit is reached.
      </p>

      <div className="rounded-xl border border-border overflow-hidden mb-6">
        {[
          { step: "1. Plan", desc: "ZenCoder reads the task and decides which files to explore first." },
          { step: "2. Read", desc: "It calls file_read, file_glob, and workspace_search to gather context." },
          { step: "3. Reason", desc: "The model synthesises what it found and decides what edits are needed." },
          { step: "4. Edit", desc: "It calls file_edit with a precise diff. You're shown the proposed change and asked to confirm." },
          { step: "5. Verify", desc: "It re-reads the edited file to check the change landed correctly." },
          { step: "6. Repeat", desc: "If more files need changing, it continues until done or max iterations." },
        ].map((row, i) => (
          <div key={i} className="flex border-b border-border last:border-0">
            <div className="w-24 flex-shrink-0 px-4 py-3 font-semibold text-primary text-sm bg-muted/20 border-r border-border">
              {row.step}
            </div>
            <div className="px-4 py-3 text-sm text-muted-foreground">{row.desc}</div>
          </div>
        ))}
      </div>

      {/* ── Agent tools ── */}
      <DocHeading level={2}>Agent tools</DocHeading>
      <p className="text-muted-foreground mb-4">
        The agent has access to six workspace tools. It decides which to call based on the task.
      </p>
      <div className="overflow-x-auto rounded-xl border border-border mb-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/40">
              <th className="text-left px-4 py-3 font-semibold w-48">Tool</th>
              <th className="text-left px-4 py-3 font-semibold">Description</th>
              <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Example trigger</th>
            </tr>
          </thead>
          <tbody>
            {agentTools.map((t, i) => (
              <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/20">
                <td className="px-4 py-3 font-mono text-sm text-primary font-semibold">{t.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{t.desc}</td>
                <td className="px-4 py-3 text-xs text-muted-foreground/70 hidden md:table-cell">{t.example}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── CLI usage ── */}
      <DocHeading level={2}>CLI usage</DocHeading>

      <StepList
        steps={[
          {
            title: "Simple agent task",
            content: (
              <CodeBlock
                language="bash"
                code={`zencoder agent "Add input validation to all POST handlers"`}
              />
            ),
          },
          {
            title: "With a specific model and iteration limit",
            content: (
              <CodeBlock
                language="bash"
                code={`zencoder agent \\
  -m anthropic/claude-3-5-sonnet \\
  --max-iter 20 \\
  -w ./internal \\
  "Refactor the auth module to use the new AppError type throughout"`}
              />
            ),
          },
          {
            title: "Review the session trace",
            content: (
              <>
                <p>Each agent step is logged. You&apos;ll see something like:</p>
                <CodeBlock
                  language="text"
                  code={`[Agent] Reading: internal/auth/middleware.go
[Agent] Search: "AppError" → 12 matches in 5 files
[Agent] Reading: internal/errors/errors.go
[Agent] Proposing edit to internal/auth/middleware.go

--- a/internal/auth/middleware.go
+++ b/internal/auth/middleware.go
@@ -42,7 +42,7 @@
-    return fmt.Errorf("unauthorized: %v", err)
+    return &AppError{Code: 401, Msg: "unauthorized", Cause: err}

Apply this change? (y/n/skip): y
[Agent] ✓ Applied. Continuing...`}
                />
              </>
            ),
          },
        ]}
      />

      {/* ── VSCode agent mode ── */}
      <DocHeading level={2}>Agent mode in VSCode</DocHeading>
      <p className="text-muted-foreground mb-4">
        Switch the Mode dropdown to <strong className="text-foreground">Agent</strong> in the chat panel.
        All subsequent messages run through the agent loop — ZenCoder will read and edit files in your
        open workspace directory.
      </p>

      <Callout type="info">
        Plan mode shows the proposed step list before executing.
        Ask mode is single-turn and never edits files.
        Agent mode is the only mode that can write to disk.
      </Callout>

      {/* ── Best practices ── */}
      <DocHeading level={2}>Best practices</DocHeading>
      <ul className="space-y-3 text-muted-foreground text-sm">
        {[
          "Be specific about scope: 'Refactor the auth module' is better than 'Refactor the codebase'.",
          "Use --max-iter on large tasks to step through changes incrementally.",
          "Review each proposed edit before confirming — the agent shows diffs.",
          "Commit your current work before running agent mode on critical files.",
          "Use --routing cloud for complex multi-file refactors; local models work for small, targeted edits.",
          "The agent has no network access — it can only read/write files in your workspace.",
        ].map((tip, i) => (
          <li key={i} className="flex gap-2.5">
            <span className="text-primary font-bold mt-0.5">·</span>
            {tip}
          </li>
        ))}
      </ul>

      <NextStep href="/docs/troubleshooting" label="Troubleshooting — common issues and fixes" />
    </DocsLayout>
  )
}
