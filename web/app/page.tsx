import { FeatureStepsDemo } from "@/components/blocks/feature-section"
import { HeroSection } from "@/components/blocks/hero-section"
import { ProviderGrid } from "@/components/blocks/provider-grid"
import { FeatureMatrix } from "@/components/blocks/feature-matrix"
import { DeploymentCards } from "@/components/blocks/deployment-cards"
import { ConfigReference } from "@/components/blocks/config-reference"
import { SiteFooter } from "@/components/blocks/site-footer"
import { SiteNav } from "@/components/blocks/site-nav"

export default function Home() {
  return (
    <div className="flex flex-col min-h-full">
      <SiteNav />

      {/* Hero */}
      <section id="hero">
        <HeroSection />
      </section>

      {/* How it works — animated feature steps */}
      <section id="how-it-works" className="py-4">
        <FeatureStepsDemo />
      </section>

      {/* Provider compatibility grid */}
      <section id="providers" className="py-16 px-8 border-t border-border">
        <ProviderGrid />
      </section>

      {/* Feature matrix */}
      <section id="features" className="py-16 px-8 border-t border-border">
        <FeatureMatrix />
      </section>

      {/* Deployment options */}
      <section id="deploy" className="py-16 px-8 border-t border-border">
        <DeploymentCards />
      </section>

      {/* Configuration reference */}
      <section id="config" className="py-16 px-8 border-t border-border">
        <ConfigReference />
      </section>

      <SiteFooter />
    </div>
  )
}
