import { createContext, useContext, useState, type ReactNode } from "react";

interface NextAIContextValue {
  open: boolean;
  openPanel: () => void;
  closePanel: () => void;
  togglePanel: () => void;
}

const NextAIContext = createContext<NextAIContextValue | null>(null);

export function NextAIProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <NextAIContext.Provider
      value={{
        open,
        openPanel: () => setOpen(true),
        closePanel: () => setOpen(false),
        togglePanel: () => setOpen((o) => !o),
      }}
    >
      {children}
    </NextAIContext.Provider>
  );
}

export function useNextAI() {
  const ctx = useContext(NextAIContext);
  if (!ctx) throw new Error("useNextAI must be used within NextAIProvider");
  return ctx;
}
