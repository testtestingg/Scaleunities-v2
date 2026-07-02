"use client"

import { useEffect, useState } from "react"

interface TypingTextProps {
  /** Phrases to cycle through, typed then deleted. */
  words?: string[]
  className?: string
  typingSpeed?: number
  deletingSpeed?: number
  /** Pause once a word is fully typed, in ms. */
  pause?: number
}

/**
 * Types out each phrase character by character, pauses, deletes it, then
 * moves to the next. A blinking caret trails the text.
 */
export function TypingText({
  words = ["Websites.", "Mobile Apps.", "Custom Software.", "Digital Brands."],
  className,
  typingSpeed = 90,
  deletingSpeed = 45,
  pause = 1400,
}: TypingTextProps) {
  const [wordIndex, setWordIndex] = useState(0)
  const [text, setText] = useState("")
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[wordIndex % words.length]

    if (!deleting && text === current) {
      const t = setTimeout(() => setDeleting(true), pause)
      return () => clearTimeout(t)
    }

    if (deleting && text === "") {
      setDeleting(false)
      setWordIndex((i) => (i + 1) % words.length)
      return
    }

    const t = setTimeout(
      () => {
        setText((prev) =>
          deleting ? current.slice(0, prev.length - 1) : current.slice(0, prev.length + 1),
        )
      },
      deleting ? deletingSpeed : typingSpeed,
    )
    return () => clearTimeout(t)
  }, [text, deleting, wordIndex, words, typingSpeed, deletingSpeed, pause])

  return (
    <span className={className} aria-live="polite">
      {text}
      <span className="typing-caret bg-[#6B21A8]" aria-hidden="true">
        &nbsp;
      </span>
    </span>
  )
}
