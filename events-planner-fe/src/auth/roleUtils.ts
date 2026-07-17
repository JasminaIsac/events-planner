import { getAccessToken } from "~/api/tokenStorage";
import { USER_ROLES } from "~/types";

import { jwtDecode } from "jwt-decode";

type JwtPayload = Record<string, unknown>;

export function getClaim<T = unknown>(claim: string): T | null {
  const token = getAccessToken();

  if (!token) {
    return null;
  }

  const decoded = jwtDecode<JwtPayload>(token);

  return (decoded[claim] as T) ?? null;
}

const ROLE_CLAIM =
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

function getRoles(): string[] {
  const roles = getClaim<string | string[]>(ROLE_CLAIM);

  if (!roles) {
    return [];
  }

  return Array.isArray(roles) ? roles : [roles];
}

export function isAdmin() {
  return getRoles().includes(USER_ROLES.ADMIN);
}

export function isOrganizer() {
  return getRoles().includes(USER_ROLES.ORGANIZER);
}

export function isViewer() {
  return getRoles().includes(USER_ROLES.VIEWER);
}

export function hasRole(role: string) {
  return getRoles().includes(role);
}
