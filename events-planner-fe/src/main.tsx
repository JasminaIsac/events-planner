import "~/styles/tailwind.css";

import { StrictMode } from "react";

import { QueryClientProvider } from "@tanstack/react-query";

import { App } from "~/app";

import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { queryClient } from "./query/queryClient";

async function enableMocking() {
  if (import.meta.env.VITE_USE_MOCK !== "true") {
    return;
  }

  const { worker } = await import("~/mocks/browser");

  await worker.start({
    onUnhandledRequest: "bypass",
    serviceWorker: {
      url: "/mockServiceWorker.js",
    },
  });
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </StrictMode>,
  );
});
