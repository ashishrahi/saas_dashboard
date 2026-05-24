import { QueryClient } from "@tanstack/react-query"

export function createAppQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: (failureCount, error) => {
          const status =
            error && typeof error === "object"
              ? (error as { status?: number }).status
              : undefined
          if (
            status === 401 ||
            status === 403 ||
            status === 404 ||
            status === 429
          ) {
            return false
          }
          return failureCount < 1
        },
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5,
      },
      mutations: {
        retry: false,
      },
    },
  })
}
