"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, ChevronRight } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

export const docsSections = [
  { label: "Quick Start", href: "/docs/quickstart", emoji: "🚀" },
  { label: "CLI Reference", href: "/docs/cli", emoji: "💻" },
  { label: "VSCode Extension", href: "/docs/vscode", emoji: "🔌" },
  { label: "Agent Mode", href: "/docs/agent", emoji: "🤖" },
  { label: "Provider Setup", href: "/docs/providers", emoji: "🔑" },
  { label: "Troubleshooting", href: "/docs/troubleshooting", emoji: "🛠" },
]

export function DocsLayout({
  children,
  activePath,
}: {
  children: React.ReactNode
  activePath: string
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Top bar */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm h-14 flex items-center px-4 gap-4">
        <button
          className="md:hidden text-muted-foreground"
          onClick={() => setSidebarOpen((v) => !v)}
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <Image src="/logo.png" alt="ZenCoder" width={24} height={24} className="rounded-sm" />
          ZenCoder
        </Link>
        <span className="text-muted-foreground text-sm hidden md:inline">/ Docs</span>
        <nav className="ml-auto flex items-center gap-4 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <a
            href="/docs/quickstart"
            className="px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors"
          >
            Get Started
          </a>
        </nav>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed inset-y-14 left-0 z-40 w-64 border-r border-border bg-background overflow-y-auto transition-transform duration-200",
            "md:sticky md:top-14 md:translate-x-0 md:h-[calc(100vh-3.5rem)]",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <nav className="p-4 space-y-1">
            {docsSections.map((s) => (
              <a
                key={s.href}
                href={s.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                  activePath === s.href
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <span>{s.emoji}</span>
                {s.label}
                {activePath === s.href && (
                  <ChevronRight className="w-3.5 h-3.5 ml-auto" />
                )}
              </a>
            ))}
          </nav>

          <div className="p-4 mt-4 mx-4 rounded-xl border border-border bg-muted/20">
            <p className="text-xs text-muted-foreground leading-relaxed">
              🔒 No data stored · VSCode plugin & REPL are free to install
            </p>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 min-w-0 px-6 py-10 md:px-12 max-w-4xl">
          {children}
        </main>
      </div>
    </div>
  )
}
