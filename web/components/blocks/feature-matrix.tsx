"use client"

import { useState } from "react"
import { Search, Bot, FileText, TestTube, RefreshCw, Bug, BookOpen, GitPullRequest, Shield, Layers, Wrench, FolderSearch, FileEdit, Trash2, Globe } from "lucide-react"
import { cn } from "@/lib/utils"

interface SkillRow {
  category: string
  description: string
  example: string
  icon: React.ComponentType<{ className?: string }>
}

interface ApiRow {
  method: "GET" | "POST" | "DELETE" | "PUT"
  path: string
  purpose: string
}

const skills: SkillRow[] = [
  {
    category: "Code Review",
    description: "Analyse code for bugs, style, security, and best practices",
    example: "Review this PR for security issues",
    icon: GitPullRequest,
  },
  {
    category: "Test Generation",
    description: "Write unit, integration, and e2e tests for existing code",
    example: "Generate tests for the auth module",
    icon: TestTube,
  },
  {
    category: "Refactoring",
    description: "Restructure code for readability, performance, or patterns",
    example: "Extract this logic into smaller functions",
    icon: RefreshCw,
  },
  {
    category: "Debugging",
    description: "Identify root causes and propose targeted fixes",
    example: "Why does this crash on nil pointer?",
    icon: Bug,
  },
  {
    category: "Documentation",
    description: "Generate docstrings, README sections, and API docs",
    example: "Document the /api/chat endpoint",
    icon: BookOpen,
  },
  {
    category: "Code Generation",
    description: "Write new functions, modules, or entire files from spec",
    example: "Create a Go HTTP middleware for rate-limiting",
    icon: FileText,
  },
  {
    category: "Security Audit",
    description: "Scan for OWASP top-10 and common vulnerability patterns",
    example: "Audit this handler for injection risks",
    icon: Shield,
  },
  {
    category: "Architecture",
    description: "Design system components and evaluate trade-offs",
    example: "Design a multi-tenant caching layer",
    icon: Layers,
  },
  {
    category: "Dependency Analysis",
    description: "Review package usage, find unused deps, flag CVEs",
    example: "Which packages can be removed?",
    icon: Search,
  },
  {
    category: "Agent Tasks",
    description: "Multi-step autonomous coding with tool use",
    example: "Refactor all API handlers to use the new middleware",
    icon: Bot,
  },
  {
    category: "Custom Skills",
    description: "User-defined skill workflows loaded from .zencoder/skills/",
    example: "Run my team's code-review checklist",
    icon: Wrench,
  },
]

const agentTools = [
  { name: "file_read", description: "Read any file in the workspace" },
  { name: "file_glob", description: "Find files matching a glob pattern" },
  { name: "workspace_search", description: "Full-text search across the workspace" },
  { name: "list_directory", description: "List directory contents recursively" },
  { name: "file_edit", description: "Apply targeted edits to a file" },
  { name: "file_remove", description: "Delete a file from the workspace" },
]

const apiEndpoints: ApiRow[] = [
  { method: "POST", path: "/api/chat", purpose: "Stream a chat completion" },
  { method: "POST", path: "/api/agent", purpose: "Run a multi-step agent task" },
  { method: "GET", path: "/api/health", purpose: "Daemon health check" },
  { method: "GET", path: "/api/models", purpose: "List available models" },
  { method: "GET", path: "/api/models/recommend", purpose: "Get cascade-recommended model" },
  { method: "POST", path: "/api/models/verify", purpose: "Verify a provider connection" },
  { method: "GET", path: "/api/skills", purpose: "List skill categories" },
  { method: "POST", path: "/api/context", purpose: "Add files to context window" },
  { method: "DELETE", path: "/api/context", purpose: "Clear context window" },
  { method: "GET", path: "/api/session", purpose: "Get current session history" },
  { method: "DELETE", path: "/api/session", purpose: "Clear session history" },
  { method: "POST", path: "/byok/add", purpose: "Add a BYOK provider key" },
  { method: "POST", path: "/byok/test", purpose: "Test a BYOK key connection" },
  { method: "POST", path: "/byok/migrate", purpose: "Migrate keys to pool" },
  { method: "GET", path: "/byok/list", purpose: "List registered BYOK providers" },
]

const methodColors: Record<string, string> = {
  GET: "bg-blue-500/10 text-blue-400",
  POST: "bg-green-500/10 text-green-400",
  DELETE: "bg-red-500/10 text-red-400",
  PUT: "bg-yellow-500/10 text-yellow-400",
}

type Tab = "skills" | "tools" | "api"

export function FeatureMatrix() {
  const [tab, setTab] = useState<Tab>("skills")
  const [query, setQuery] = useState("")

  const filteredSkills = skills.filter(
    (s) =>
      s.category.toLowerCase().includes(query.toLowerCase()) ||
      s.description.toLowerCase().includes(query.toLowerCase()) ||
      s.example.toLowerCase().includes(query.toLowerCase())
  )

  const filteredTools = agentTools.filter(
    (t) =>
      t.name.toLowerCase().includes(query.toLowerCase()) ||
      t.description.toLowerCase().includes(query.toLowerCase())
  )

  const filteredApi = apiEndpoints.filter(
    (e) =>
      e.path.toLowerCase().includes(query.toLowerCase()) ||
      e.purpose.toLowerCase().includes(query.toLowerCase()) ||
      e.method.toLowerCase().includes(query.toLowerCase())
  )

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: "skills", label: "11 Skill Categories", count: skills.length },
    { key: "tools", label: "6 Agent Tools", count: agentTools.length },
    { key: "api", label: "15 API Endpoints", count: apiEndpoints.length },
  ]

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold mb-3 text-center">
        Feature Matrix
      </h2>
      <p className="text-muted-foreground text-center mb-10">
        Everything ZenCoder can do — searchable and filterable.
      </p>

      {/* Search */}
      <div className="relative mb-6 max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search features, tools, endpoints…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-muted/30 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-border">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={cn(
              "px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors",
              tab === t.key
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Skills table */}
      {tab === "skills" && (
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="text-left px-4 py-3 font-semibold">Category</th>
                <th className="text-left px-4 py-3 font-semibold">Description</th>
                <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Example Prompt</th>
              </tr>
            </thead>
            <tbody>
              {filteredSkills.map((s, i) => {
                const Icon = s.icon
                return (
                  <tr
                    key={s.category}
                    className={cn(
                      "border-b border-border last:border-0 hover:bg-muted/20 transition-colors",
                      i % 2 === 0 ? "" : "bg-muted/10"
                    )}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5 font-medium text-foreground">
                        <Icon className="w-4 h-4 text-primary flex-shrink-0" />
                        {s.category}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{s.description}</td>
                    <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">
                      <span className="font-mono text-xs bg-muted/50 px-2 py-0.5 rounded">
                        {s.example}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Agent tools table */}
      {tab === "tools" && (
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="text-left px-4 py-3 font-semibold">Tool</th>
                <th className="text-left px-4 py-3 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody>
              {filteredTools.map((t, i) => (
                <tr
                  key={t.name}
                  className={cn(
                    "border-b border-border last:border-0 hover:bg-muted/20 transition-colors",
                    i % 2 === 0 ? "" : "bg-muted/10"
                  )}
                >
                  <td className="px-4 py-3 font-mono text-sm text-primary font-semibold">
                    {t.name}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{t.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* API endpoints table */}
      {tab === "api" && (
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="text-center px-4 py-3 font-semibold w-24">Method</th>
                <th className="text-left px-4 py-3 font-semibold">Path</th>
                <th className="text-left px-4 py-3 font-semibold">Purpose</th>
              </tr>
            </thead>
            <tbody>
              {filteredApi.map((e, i) => (
                <tr
                  key={e.path}
                  className={cn(
                    "border-b border-border last:border-0 hover:bg-muted/20 transition-colors",
                    i % 2 === 0 ? "" : "bg-muted/10"
                  )}
                >
                  <td className="px-4 py-3 text-center">
                    <span
                      className={cn(
                        "inline-flex px-2 py-0.5 rounded text-xs font-bold font-mono",
                        methodColors[e.method]
                      )}
                    >
                      {e.method}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-foreground">
                    {e.path}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{e.purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
