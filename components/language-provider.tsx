"use client"

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react"
import { translations, type Lang, type Dictionary } from "@/lib/i18n"

interface LanguageContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  toggle: () => void
  t: Dictionary
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

const STORAGE_KEY = "scaleunities-lang"

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en")

  // Restore saved preference or detect from the browser on first mount.
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY) as Lang | null
      if (saved === "en" || saved === "fr") {
        setLangState(saved)
        return
      }
      if (navigator.language?.toLowerCase().startsWith("fr")) {
        setLangState("fr")
      }
    } catch {
      /* ignore storage/access errors */
    }
  }, [])

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      /* ignore */
    }
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang
    }
  }, [lang])

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      setLang: setLangState,
      toggle: () => setLangState((prev) => (prev === "en" ? "fr" : "en")),
      t: translations[lang],
    }),
    [lang],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    // Fallback to English if used outside the provider (keeps SSR safe).
    return { lang: "en" as Lang, setLang: () => {}, toggle: () => {}, t: translations.en }
  }
  return ctx
}
