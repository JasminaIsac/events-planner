import { API_BASE_URL } from "~/config/constants";
import type { AuthResponse } from "~/types/auth";

import {
  clearAccessToken,
  getAccessToken,
  setAccessToken,
} from "./tokenStorage";

function buildHeaders(headers?: HeadersInit, accessToken?: string) {
  return {
    "Content-Type": "application/json",
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    ...headers,
  };
}

async function parseResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Request failed: ${errorText}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}

async function refreshAccessToken() {
  const response = await fetch(`${API_BASE_URL}api/auth/refresh`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to refresh token");
  }

  const data = (await response.json()) as AuthResponse;

  setAccessToken(data.accessToken);

  return data.accessToken;
}

let refreshPromise: Promise<string> | null = null;

function refreshAccessTokenOnce() {
  if (!refreshPromise) {
    refreshPromise = refreshAccessToken().finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
}

export async function publicApiFetch<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}api${path}`, {
    ...options,
    credentials: "include",
    headers: buildHeaders(options?.headers),
  });

  return parseResponse<T>(response);
}

export async function apiFetch<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const accessToken = getAccessToken();

  const response = await fetch(`${API_BASE_URL}api${path}`, {
    ...options,
    credentials: "include",
    headers: buildHeaders(options?.headers, accessToken ?? undefined),
  });

  if (response.status !== 401) {
    return parseResponse<T>(response);
  }

  try {
    const newAccessToken = await refreshAccessTokenOnce();

    const retryResponse = await fetch(`${API_BASE_URL}api${path}`, {
      ...options,
      credentials: "include",
      headers: buildHeaders(options?.headers, newAccessToken),
    });

    return parseResponse<T>(retryResponse);
  } catch {
    clearAccessToken();
    window.dispatchEvent(new Event("auth:session-expired"));
    throw new Error("Session expired");
  }
}
