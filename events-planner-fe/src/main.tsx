import "~/styles/tailwind.css";

import { StrictMode } from "react";

import { QueryClientProvider } from "@tanstack/react-query";

import { App } from "~/app";

import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { queryClient } from "./query/queryClient";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
