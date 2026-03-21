"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import Image from "next/image"

const links = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Providers", href: "#providers" },
  { label: "Features", href: "#features" },
  { label: "Deploy", href: "#deploy" },
  { label: "Config", href: "#config" },
]

export function SiteNav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2 font-bold text-xl">
          <Image src="/logo.png" alt="ZenCoder" width={28} height={28} className="rounded-sm" />
          ZenCoder
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#how-it-works"
            className="text-sm px-4 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Install Free →
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-muted-foreground"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-background px-6 py-4 flex flex-col gap-4 text-sm">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-muted-foreground hover:text-foreground"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#how-it-works"
            className="mt-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-center"
            onClick={() => setOpen(false)}
          >
            Get Started →
          </a>
        </div>
      )}
    </header>
  )
}
