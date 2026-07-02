"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface RevealProps {
  children: ReactNode
  /** Delay in seconds before the animation starts. */
  delay?: number
  /** Direction the content slides in from. */
  direction?: "up" | "down" | "left" | "right"
  className?: string
}

const offset = 28

const variantsFor = (direction: RevealProps["direction"]) => {
  const map = {
    up: { y: offset, x: 0 },
    down: { y: -offset, x: 0 },
    left: { x: offset, y: 0 },
    right: { x: -offset, y: 0 },
  } as const
  return map[direction ?? "up"]
}

/**
 * Fades and slides its children into view the first time they enter the viewport.
 * Used to give homepage sections a subtle, consistent scroll-in effect.
 */
export function Reveal({ children, delay = 0, direction = "up", className }: RevealProps) {
  const from = variantsFor(direction)
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...from }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
