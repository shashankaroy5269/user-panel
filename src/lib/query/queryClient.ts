import { QueryClient } from "@tanstack/react-query";
import { isServer } from "@tanstack/react-query";

function createClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60, // 1 min
        refetchOnWindowFocus: false,
      },
    },
  });
}

let clientCache: QueryClient | undefined;

export function initQueryClient() {
  if (isServer) {
    return createClient(); // SSR: always new
  }

  if (!clientCache) {
    clientCache = createClient(); // browser: singleton
  }

  return clientCache;
}