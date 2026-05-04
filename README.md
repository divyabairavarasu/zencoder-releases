<div align="center">

```
          ✧  ·  ˖  ·  ✧
         ( ˘◡˘ )
          ─[≡]─
         /  │  \
        /  (✦)  \
       /____│____\
      |   \___/   |
       \_________/
```

# ZenCoder

**Best things in life are almost free :P**

*The AI coding assistant that won't drain your wallet — or your patience.*

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Go 1.22+](https://img.shields.io/badge/Go-1.22+-00ADD8.svg)](https://go.dev)
[![VSCode Extension](https://img.shields.io/badge/VSCode-Extension-007ACC.svg)](vscode/)

</div>

---

## What is ZenCoder?

ZenCoder is an open-source AI coding assistant that routes your requests intelligently across **free and cheap local/cloud models** — so you get great answers without worrying about token costs.

Run it as a CLI, as a background daemon, or as a VSCode extension. It works with your existing models (Ollama, LM Studio, OpenRouter, Anthropic, OpenAI, and more) and picks the right one for each task automatically.

> 🧘 *The best code flows from a calm mind. ZenCoder keeps you in flow.*

---

## Features

### 🤖 Auto Mode
ZenCoder's intelligent router dispatches each request to the best available model — local for simple tasks, cloud for complex ones. Zero configuration required.

### 💸 Free Models First
Designed from the ground up for **free and near-free** model tiers. Run Ollama or LM Studio locally, use free cloud tiers, or bring your own API key. You control the spend.

### 🔑 BYOK — Bring Your Own Key
Securely store API keys for 7+ providers (Anthropic, OpenAI, Gemini, Mistral, Groq, Cohere, Together) in one place. Keys are encrypted at rest and never leave your machine.

### 🛠 Agent Mode
Full agentic loop: ZenCoder can read files, search your codebase, propose edits, and iterate — all within your workspace. Like a junior developer that never sleeps.

### 📚 Skills System
Auto-detects the right AI skill for each conversation: `code-review`, `test-generation`, `refactor`, `explain`, `debug`, and more. Skills can be manually toggled or auto-applied.

### ⚡ Streaming Responses
Token-by-token streaming across all backends. No waiting for a full response to arrive — watch ideas form in real time.

### 🔌 Multi-Provider
Works with any OpenAI-compatible API endpoint, plus native support for Anthropic, Gemini, and LM Studio. Add new providers without recompiling.

---

## Quick Start

### Install

**Requires [GitHub CLI](https://cli.github.com) — authenticate once before installing:**

```bash
gh auth login
```

Then install ZenCoder (auto-detects your OS and chip, starts `zencoderd` as a background service):

```bash
curl -fsSL https://raw.githubusercontent.com/divyabairavarasu/zencoder-releases/main/install.sh | bash
```

### Run the Daemon

```bash
# Start the background agent service
zencoderd
# → ZenCoder daemon listening on :7777
```

### Use the CLI

```bash
# Interactive REPL (auto-selects best model)
zencoder

# Ask a question
zencoder chat -m ollama/llama3 "What does this codebase do?"

# Agentic session — reads files, proposes edits
zencoder agent -m anthropic/claude-3-haiku "Add input validation to all API handlers"

# List available models
zencoder models

# Check service health
zencoder health
```

### VSCode Extension

1. Open the `vscode/` directory in VSCode
2. `npm install && npm run build`
3. Press **F5** to launch the Extension Development Host
4. Open the command palette → **ZenCoder: Chat**

---

## Architecture

```
┌──────────────────────────────────────────────────────────┐
│                    ZenCoder Stack                        │
│                                                          │
│  ┌─────────────┐   ┌──────────────┐   ┌──────────────┐  │
│  │  CLI (Go)   │   │ VSCode Ext.  │   │  Other IDEs  │  │
│  │  zencoder   │   │  TypeScript  │   │  (future)    │  │
│  └──────┬──────┘   └──────┬───────┘   └──────┬───────┘  │
│         └─────────────────┼──────────────────┘          │
│                     HTTP / SSE                           │
│                      ↓                                   │
│  ┌───────────────────────────────────────────────────┐   │
│  │              zencoderd  (port 7777)               │   │
│  │                                                   │   │
│  │  ┌──────────────┐    ┌────────────────────────┐   │   │
│  │  │ Chat Handler │    │  Agent Loop (tools)    │   │   │
│  │  └──────┬───────┘    └────────────┬───────────┘   │   │
│  │         └─────────────────────────┘               │   │
│  │                    ↓                              │   │
│  │         ┌──────────────────────┐                 │   │
│  │         │  Intelligent Router  │                 │   │
│  │         │  (Auto/Local/Cloud)  │                 │   │
│  │         └──────────┬───────────┘                 │   │
│  └────────────────────┼──────────────────────────────┘   │
│                       ↓                                  │
│  ┌────────┐  ┌────────┐  ┌──────────┐  ┌────────────┐   │
│  │ Ollama │  │LMStudio│  │OpenRouter│  │ Anthropic  │   │
│  │(local) │  │(local) │  │  (free)  │  │ OpenAI ... │   │
│  └────────┘  └────────┘  └──────────┘  └────────────┘   │
└──────────────────────────────────────────────────────────┘
```

### Components

| Directory | Language | Purpose |
|-----------|----------|---------|
| `cmd/zencoder/` | Go | CLI — chat, agent, edit, explain, generate |
| `cmd/zencoderd/` | Go | Daemon — HTTP API, model routing, agent loop |
| `cmd/zencoder-secrets/` | Go | BYOK secrets manager |
| `internal/llm/` | Go | LLM provider adapters (Anthropic, OpenAI-compat) |
| `internal/ui/` | Go | Terminal rendering, streaming output |
| `vscode/` | TypeScript | VSCode extension with chat webview |

---

## Configuration

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `ZENCODER_ADDR` | `http://127.0.0.1:7777` | Daemon address |

### VSCode Settings

| Setting | Default | Description |
|---------|---------|-------------|
| `zenCoder.agentAddress` | `http://127.0.0.1:7777` | Local daemon address |
| `zenCoder.maxMessages` | `100` | Chat history size |
| `zenCoder.maxContextBytes` | `200000` | Max file context per request |
| `zenCoder.autoDetectSkills` | `true` | Auto-apply AI skills |

---

## Adding API Keys (BYOK)

```bash
# Interactive key management
zencoder-secrets add anthropic
zencoder-secrets add openai
zencoder-secrets list
zencoder-secrets remove groq
```

Supported providers: `anthropic`, `openai`, `gemini`, `mistral`, `groq`, `cohere`, `together`

---

## CLI Reference

```
zencoder <command> [flags]

Commands:
  (no command)  Launch interactive REPL (auto-selects model)
  agent         Agentic session — reads files, proposes edits
  chat          Single-turn chat request
  edit          Rewrite/edit text with instructions
  explain       Explain code or text
  generate      Generate code from a prompt
  models        List available models
  skills        List available AI skills
  health        Check daemon health
  version       Show version
  help          Show detailed help

Flags (agent / chat):
  -m, --model     Model to use (e.g. ollama/llama3, anthropic/claude-3-haiku)
  -s, --system    System prompt
  -w, --workspace Workspace directory for context
  --mode          Chat mode: agent | ask | plan  (default: ask)
  --routing       Routing mode: auto | local | cloud  (default: auto)
  --max-iter      Max agent iterations  (default: 10)
```

---

## Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Follow `docs/CODING_STANDARDS.md`
4. Run tests: `go test ./...` and `cd vscode && npm test`
5. Open a pull request

---

## License

MIT — see [LICENSE](LICENSE).

---

<div align="center">

*Made with 🧘 by developers who believe the best tools should be free.*

**ZenCoder** · "Best things in life are almost free :P"

</div>

## Project Memory

ZenCoder automatically loads project-specific instructions from your workspace to give the agent
relevant context on every run. Create any one of the following files in your repository root:

| File | Purpose |
|------|---------|
| `.zencoder/instructions.md` | ZenCoder-specific project instructions (highest priority) |
| `CLAUDE.md` | Shared AI coding instructions (compatible with Claude Code) |
| `AGENTS.md` | Shared AI agent instructions |

The first file found (in the order above) is loaded and injected into the system prompt under
**"## Project Instructions"**. Files are capped at 8 KB. This is the **project memory** contract —
keep it concise and focused on conventions the AI should always follow.

**Example `.zencoder/instructions.md`:**
```markdown
# Project Instructions

- Use Go 1.22+ idioms; no generics until the team upgrades.
- All exported functions must have doc comments.
- Run `go test ./...` before every commit.
```
