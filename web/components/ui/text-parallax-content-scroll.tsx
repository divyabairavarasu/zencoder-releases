"use client"

import React, { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

interface Feature {
  imgUrl: string
  subheading: string
  heading: string
  children: React.ReactNode
}

const IMG_PADDING = 12

const StickyImage = ({ imgUrl }: { imgUrl: string }) => {
  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  })
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  return (
    <motion.div
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: `calc(100vh - ${IMG_PADDING * 2}px)`,
        top: IMG_PADDING,
        scale,
      }}
      ref={targetRef}
      className="sticky z-0 overflow-hidden rounded-3xl"
    >
      <motion.div
        className="absolute inset-0 bg-neutral-950/70"
        style={{ opacity }}
      />
    </motion.div>
  )
}

const OverlayCopy = ({
  subheading,
  heading,
}: {
  subheading: string
  heading: string
}) => {
  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], [250, -250])
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0])

  return (
    <motion.div
      style={{ y, opacity }}
      ref={targetRef}
      className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white"
    >
      <p className="mb-2 text-center text-xl font-medium md:mb-4 md:text-3xl">
        {subheading}
      </p>
      <p className="text-center text-4xl font-bold md:text-7xl">{heading}</p>
    </motion.div>
  )
}

export const TextParallaxContent = ({
  imgUrl,
  subheading,
  heading,
  children,
}: Feature) => {
  return (
    <div style={{ paddingLeft: IMG_PADDING, paddingRight: IMG_PADDING }}>
      <div className="relative h-[150vh]">
        <StickyImage imgUrl={imgUrl} />
        <OverlayCopy heading={heading} subheading={subheading} />
      </div>
      {children}
    </div>
  )
}

// ──────────────────────────────────────────────────────────────────────────────
// Re-exported example wrapper used by the demo
// ──────────────────────────────────────────────────────────────────────────────

interface ParallaxSection {
  imgUrl: string
  subheading: string
  heading: string
  content: React.ReactNode
}

export function TextParallaxContentExample({
  sections,
  className,
}: {
  sections: ParallaxSection[]
  className?: string
}) {
  return (
    <div className={className}>
      {sections.map((s, i) => (
        <TextParallaxContent
          key={i}
          imgUrl={s.imgUrl}
          subheading={s.subheading}
          heading={s.heading}
        >
          {s.content}
        </TextParallaxContent>
      ))}
    </div>
  )
}

// Reusable content block that mirrors the original ExampleContent
export function ParallaxSectionContent({
  title,
  body,
  ctaLabel,
  ctaHref,
}: {
  title: string
  body: React.ReactNode
  ctaLabel?: string
  ctaHref?: string
}) {
  return (
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
      <h2 className="col-span-1 text-3xl font-bold text-foreground md:col-span-4">
        {title}
      </h2>
      <div className="col-span-1 md:col-span-8">
        <div className="space-y-4 text-lg text-muted-foreground md:text-xl">
          {body}
        </div>
        {ctaLabel && ctaHref && (
          <a
            href={ctaHref}
            className="mt-8 inline-flex items-center gap-1 rounded bg-foreground px-8 py-3 text-base font-semibold text-background transition-colors hover:bg-foreground/80"
          >
            {ctaLabel} <ArrowUpRight className="h-4 w-4" />
          </a>
        )}
      </div>
    </div>
  )
}
