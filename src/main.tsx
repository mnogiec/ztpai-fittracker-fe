import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Routes } from "./Routes.tsx";
import {
  QueryClient,
  QueryClientConfig,
  QueryClientProvider,
} from "@tanstack/react-query";

const QUERY_CLIENT_CONFIG: QueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
};

const queryClient = new QueryClient(QUERY_CLIENT_CONFIG);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Routes />
    </QueryClientProvider>
  </StrictMode>
);
