const MINUTE = 60
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR
const WEEK = 7 * DAY

export function formatRelativeTime(date: Date, now = new Date()): string {
  const seconds = Math.round((now.getTime() - date.getTime()) / 1000)

  if (seconds < MINUTE) return "Just now"
  if (seconds < HOUR) {
    const minutes = Math.floor(seconds / MINUTE)
    return `${minutes}m ago`
  }
  if (seconds < DAY) {
    const hours = Math.floor(seconds / HOUR)
    return `${hours}h ago`
  }
  if (seconds < WEEK) {
    const days = Math.floor(seconds / DAY)
    return `${days}d ago`
  }

  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  })
}
