/** Match sidebar / breadcrumb active routes (exact for home). */
export function isNavRouteActive(pathname: string, to: string): boolean {
  if (to === "/") return pathname === "/"
  return pathname === to || pathname.startsWith(`${to}/`)
}
