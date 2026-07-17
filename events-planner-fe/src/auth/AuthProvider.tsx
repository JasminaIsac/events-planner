import { useEffect, useState } from "react";

import { useQueryClient } from "@tanstack/react-query";

import {
  login as loginApi,
  logout as logoutApi,
  register as registerApi,
} from "~/api/auth";
import { clearAccessToken, getAccessToken } from "~/api/tokenStorage";
import { getCurrentUser } from "~/api/users";
import type { LoginRequest, RegisterRequest } from "~/types/auth";
import { routePaths } from "~/utils/routePaths";

import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  function clearSession() {
    clearAccessToken();
    queryClient.clear();
    setIsAuthenticated(false);
  }

  useEffect(() => {
    async function restoreAuth() {
      const token = getAccessToken();

      if (!token) {
        setIsAuthenticated(false);
        setIsAuthLoading(false);
        return;
      }

      try {
        await getCurrentUser();
        setIsAuthenticated(true);
      } catch {
        clearSession();
      } finally {
        setIsAuthLoading(false);
      }
    }

    restoreAuth();
  }, []);

  useEffect(() => {
    function handleSessionExpired() {
      clearSession();
      navigate(routePaths.login, { replace: true });
    }

    window.addEventListener("auth:session-expired", handleSessionExpired);

    return () => {
      window.removeEventListener("auth:session-expired", handleSessionExpired);
    };
  }, [navigate, queryClient]);

  async function login(request: LoginRequest) {
    await loginApi(request);
    setIsAuthenticated(true);
    navigate(routePaths.Index);
  }

  async function register(request: RegisterRequest) {
    await registerApi(request);
    setIsAuthenticated(true);
    navigate(routePaths.Index);
  }

  async function logout() {
    try {
      await logoutApi();
    } finally {
      clearSession();
      navigate(routePaths.login, { replace: true });
    }
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isAuthLoading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
