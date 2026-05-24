import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import { CommandPalette } from "./command-palette"

interface GlobalSearchContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  openPalette: () => void
}

const GlobalSearchContext = createContext<GlobalSearchContextValue | null>(null)

export function useGlobalSearchPalette() {
  const ctx = useContext(GlobalSearchContext)
  if (!ctx) {
    throw new Error("useGlobalSearchPalette must be used within GlobalSearch")
  }
  return ctx
}

interface GlobalSearchProps {
  children: ReactNode
}

export function GlobalSearch({ children }: GlobalSearchProps) {
  const [open, setOpen] = useState(false)

  const openPalette = useCallback(() => setOpen(true), [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        setOpen((current) => !current)
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  const value = useMemo(
    () => ({ open, setOpen, openPalette }),
    [open, openPalette]
  )

  return (
    <GlobalSearchContext.Provider value={value}>
      {children}
      <CommandPalette open={open} onOpenChange={setOpen} />
    </GlobalSearchContext.Provider>
  )
}
