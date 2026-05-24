type ApiErrorShape = {
  message?: string
  errors?: Record<string, string>
  status?: number
}

export function getApiErrorMessage(
  error: unknown,
  fallback = "Something went wrong. Please try again."
): string {
  if (!error) return fallback

  if (typeof error === "string") return error

  if (error instanceof Error && error.message) {
    return error.message
  }

  if (typeof error !== "object") return fallback

  const err = error as ApiErrorShape

  if (err.status === 401) {
    return "Session expired. Please sign in again."
  }
  if (err.status === 403) {
    return "You are not authorized to perform this action."
  }
  if (err.status === 404) {
    return "The requested resource was not found."
  }
  if (err.status && err.status >= 500) {
    return "Server error. Please try again later."
  }
  if (err.errors && Object.keys(err.errors).length > 0) {
    return Object.values(err.errors)[0]
  }
  if (err.message) return err.message

  return fallback
}

export function isNetworkError(error: unknown): boolean {
  if (!error || typeof error !== "object") return true
  const err = error as ApiErrorShape
  return !err.status
}
