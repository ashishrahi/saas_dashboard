/** Spacing scale — matches CSS custom properties */
export const spacing = {
  0: "gap-0",
  1: "gap-1",
  1.5: "gap-1.5",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  5: "gap-5",
  6: "gap-6",
  8: "gap-8",
} as const

export const padding = {
  panel: "p-5",
  panelLg: "p-6",
  inputX: "px-4",
  inputY: "py-2",
  cell: "px-4 py-3",
  headerCell: "px-4",
} as const

/** Standard control heights */
export const height = {
  input: "h-11",
  inputSm: "h-9",
  inputLg: "h-12",
  header: "h-16",
  tableHead: "h-12",
} as const
