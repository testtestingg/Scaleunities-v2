"use client";

import { ReactNode } from "react";

export function PageClient({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

// Export a dummy hook for backward compatibility
export function useContactForm() {
  return {
    openContactForm: () => {
      // Navigation will be handled at button level
    },
    closeContactForm: () => {},
  };
}
