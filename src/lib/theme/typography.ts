/** Typography scale — Poppins via --font-family in index.css */
export const fontFamily = "font-sans"

export const text = {
  h1: "text-heading text-[32px] font-bold leading-tight",
  h2: "text-heading text-2xl font-semibold leading-snug",
  h3: "text-heading text-xl font-semibold leading-snug",
  h4: "text-heading text-base font-medium leading-normal",
  body: "text-body text-sm leading-normal",
  label: "text-heading text-sm font-medium leading-none",
  caption: "text-muted-foreground text-xs font-medium",
  overline: "text-muted-foreground text-xs font-semibold uppercase tracking-wide",
} as const
