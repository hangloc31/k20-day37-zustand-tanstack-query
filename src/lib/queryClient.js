import { QueryClient } from '@tanstack/react-query'

/**
 * Khởi tạo ở module scope để tạo đúng một lần cho cả đời ứng dụng.
 * Không bao giờ đặt new QueryClient() bên trong component.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})