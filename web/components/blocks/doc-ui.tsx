"use client"

import { useState } from "react"
import { Copy, Check, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

// ── Code block with copy button ──────────────────────────────────────────────
export function CodeBlock({
  code,
  language = "bash",
  title,
}: {
  code: string
  language?: string
  title?: string
}) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(code.trim()).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }

  return (
    <div className="my-4 rounded-xl overflow-hidden border border-border">
      {title && (
        <div className="flex items-center justify-between px-4 py-2 bg-muted/60 border-b border-border">
          <span className="text-xs font-mono text-muted-foreground">{title}</span>
          <span className="text-xs text-muted-foreground/60">{language}</span>
        </div>
      )}
      <div className="relative bg-neutral-950">
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 p-1.5 rounded-md bg-muted/20 text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-green-400" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
        </button>
        <pre className="px-5 py-4 overflow-x-auto text-sm text-neutral-200 font-mono leading-relaxed">
          <code>{code.trim()}</code>
        </pre>
      </div>
    </div>
  )
}

// ── Step list ────────────────────────────────────────────────────────────────
export function StepList({
  steps,
}: {
  steps: { title: string; content: React.ReactNode }[]
}) {
  return (
    <ol className="space-y-8 my-6">
      {steps.map((step, i) => (
        <li key={i} className="flex gap-5">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center text-primary font-bold text-sm">
            {i + 1}
          </div>
          <div className="flex-1 pt-0.5">
            <h3 className="font-semibold text-foreground text-lg mb-2">{step.title}</h3>
            <div className="text-muted-foreground space-y-2">{step.content}</div>
          </div>
        </li>
      ))}
    </ol>
  )
}

// ── Callout / info box ───────────────────────────────────────────────────────
export function Callout({
  type = "info",
  children,
}: {
  type?: "info" | "warning" | "tip" | "danger"
  children: React.ReactNode
}) {
  const styles = {
    info: "border-blue-500/30 bg-blue-500/5 text-blue-300",
    warning: "border-yellow-500/30 bg-yellow-500/5 text-yellow-300",
    tip: "border-green-500/30 bg-green-500/5 text-green-300",
    danger: "border-red-500/30 bg-red-500/5 text-red-300",
  }
  const icons = { info: "ℹ️", warning: "⚠️", tip: "💡", danger: "🚨" }

  return (
    <div className={cn("my-4 rounded-xl border px-4 py-3 text-sm flex gap-2.5", styles[type])}>
      <span className="flex-shrink-0 text-base">{icons[type]}</span>
      <div>{children}</div>
    </div>
  )
}

// ── Section heading ──────────────────────────────────────────────────────────
export function DocHeading({
  level = 2,
  id,
  children,
}: {
  level?: 1 | 2 | 3
  id?: string
  children: React.ReactNode
}) {
  const classes = {
    1: "text-4xl font-extrabold tracking-tight text-foreground mb-4 mt-0",
    2: "text-2xl font-bold text-foreground mb-3 mt-10 pt-6 border-t border-border first:border-0 first:pt-0 first:mt-0",
    3: "text-lg font-semibold text-foreground mb-2 mt-6",
  }

  if (level === 1) return <h1 id={id} className={classes[1]}>{children}</h1>
  if (level === 3) return <h3 id={id} className={classes[3]}>{children}</h3>
  return <h2 id={id} className={classes[2]}>{children}</h2>
}

// ── Next step button ─────────────────────────────────────────────────────────
export function NextStep({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="mt-12 flex items-center justify-between w-full rounded-xl border border-border px-5 py-4 hover:bg-muted/30 transition-colors group"
    >
      <div>
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">Next</p>
        <p className="font-semibold text-foreground">{label}</p>
      </div>
      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
    </a>
  )
}

// ── Keyboard shortcut ────────────────────────────────────────────────────────
export function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-flex items-center px-2 py-0.5 rounded border border-border bg-muted text-xs font-mono text-foreground">
      {children}
    </kbd>
  )
}

// ── Inline badge ─────────────────────────────────────────────────────────────
export function Badge({
  children,
  variant = "default",
}: {
  children: React.ReactNode
  variant?: "default" | "success" | "warning"
}) {
  const styles = {
    default: "bg-primary/10 text-primary",
    success: "bg-green-500/10 text-green-400",
    warning: "bg-yellow-500/10 text-yellow-400",
  }
  return (
    <span className={cn("inline-flex px-2 py-0.5 rounded-full text-xs font-semibold", styles[variant])}>
      {children}
    </span>
  )
}
