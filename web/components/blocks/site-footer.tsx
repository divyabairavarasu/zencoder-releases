import { Zap } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-10 px-6 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2 font-semibold text-foreground">
          <Zap className="w-4 h-4 text-primary" />
          ZenCoder
        </div>

        <p className="text-center text-xs">
          🔒 No data stored &nbsp;·&nbsp; ⚠️ Free APIs may log prompts &nbsp;·&nbsp; 🤖 AI can make mistakes
        </p>

        <span className="text-xs">© {new Date().getFullYear()} ZenCoder. All rights reserved.</span>
      </div>
    </footer>
  )
}
