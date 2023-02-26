import { QueryClient } from "@tanstack/react-query";
//  QueryClientProvider, Hydrate;
const reactQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60,
      cacheTime: 1000 * 60 * 60
    }
  }
});

export default reactQueryClient;
