import { createContext } from "react";

import type { LoginRequest, RegisterRequest } from "~/types/auth";

type AuthContextValue = {
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  login: (request: LoginRequest) => Promise<void>;
  register: (request: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);
