import type { AuthResponse, LoginRequest, RegisterRequest } from "~/types/auth";

import { apiFetch, publicApiFetch } from "./client";
import { clearAccessToken, setAccessToken } from "./tokenStorage";

export async function login(request: LoginRequest) {
  const response = await publicApiFetch<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(request),
  });
  setAccessToken(response.accessToken);
}

export async function register(request: RegisterRequest) {
  const response = await publicApiFetch<AuthResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(request),
  });
  setAccessToken(response.accessToken);
}

export async function logout() {
  try {
    await apiFetch<void>("/auth/logout", {
      method: "POST",
    });
  } finally {
    clearAccessToken();
  }
}
