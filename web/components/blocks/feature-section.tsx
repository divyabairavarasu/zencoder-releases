import { FeatureSteps } from "@/components/ui/feature-section"

const features = [
  {
    step: "Step 1",
    title: "Install & Connect",
    content:
      "Install the ZenCoder VSCode extension or CLI. Connect your local Ollama or LM Studio instance — zero API keys needed to start.",
    image:
      "https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=2074&auto=format&fit=crop",
  },
  {
    step: "Step 2",
    title: "Chat, Ask & Plan",
    content:
      "Use Agent, Ask, or Plan mode to get instant code suggestions, refactors, and multi-file edits — all streamed in real time.",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
  },
  {
    step: "Step 3",
    title: "Bring Your Own Keys",
    content:
      "Plug in OpenAI, Anthropic, Gemini, or any OpenRouter-compatible provider. ZenCoder routes to the best model automatically.",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop",
  },
  {
    step: "Step 4",
    title: "Ship with Confidence",
    content:
      "No data stored, no prompt logging. Your code never leaves your machine — privacy by design.",
    image:
      "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?q=80&w=2070&auto=format&fit=crop",
  },
]

export function FeatureStepsDemo() {
  return (
    <FeatureSteps
      features={features}
      title="Your AI Coding Journey Starts Here"
      autoPlayInterval={4000}
      imageHeight="h-[500px]"
    />
  )
}
