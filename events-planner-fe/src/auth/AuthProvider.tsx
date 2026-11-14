import { useEffect, useState } from "react";

import { useQueryClient } from "@tanstack/react-query";

import {
  login as loginApi,
  logout as logoutApi,
  register as registerApi,
} from "~/api/auth";
import {
  clearAccessToken,
  getAccessToken,
  setAccessToken,
} from "~/api/tokenStorage";
import { getCurrentUser } from "~/api/users";
import type { LoginRequest, RegisterRequest } from "~/types/auth";
import { routePaths } from "~/utils/routePaths";

import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "./AuthContext";

const isMockMode = import.meta.env.VITE_USE_MOCK === "true";

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

  async function enterDemoSession() {
    const { createDemoAccessToken } = await import("~/mocks/data/user");
    setAccessToken(createDemoAccessToken());
    await getCurrentUser();
    setIsAuthenticated(true);
  }

  useEffect(() => {
    async function restoreAuth() {
      try {
        const token = getAccessToken();

        if (token) {
          await getCurrentUser();
          setIsAuthenticated(true);
          return;
        }

        if (isMockMode) {
          await enterDemoSession();
          return;
        }

        setIsAuthenticated(false);
      } catch {
        if (isMockMode) {
          try {
            await enterDemoSession();
            return;
          } catch {
            clearSession();
          }
        } else {
          clearSession();
        }
      } finally {
        setIsAuthLoading(false);
      }
    }

    restoreAuth();
  }, []);

  useEffect(() => {
    function handleSessionExpired() {
      if (isMockMode) {
        void enterDemoSession().then(() => {
          navigate(routePaths.Index, { replace: true });
        });
        return;
      }

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
    if (isMockMode) {
      // Demo stays signed in so visitors never hit the login wall.
      await enterDemoSession();
      navigate(routePaths.Index, { replace: true });
      return;
    }

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
