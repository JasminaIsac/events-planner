import { AuthProvider } from "~/auth/AuthProvider";

import { Toaster } from "sonner";

import AppRouter from "./AppRouter";

export default function App() {
  return (
    <AuthProvider>
      <AppRouter />
      <Toaster />
    </AuthProvider>
  );
}
