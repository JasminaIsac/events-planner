import type { User } from "~/types";
import { USER_ROLES } from "~/types";

export const DEMO_USER: User = {
  id: "demo-user-1",
  firstName: "Demo",
  lastName: "Organizer",
  email: "demo@demo.com",
  phone: "+40 700 000 000",
  role: USER_ROLES.ORGANIZER,
  isActive: true,
  createdAt: "2026-11-01T08:00:00.000Z",
  updatedAt: "2026-11-01T08:00:00.000Z",
};

const ROLE_CLAIM =
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

function toBase64Url(value: object): string {
  return btoa(JSON.stringify(value))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

/** Unsigned JWT that jwt-decode can read (role claim matches the real API). */
export function createDemoAccessToken(role: string = USER_ROLES.ORGANIZER) {
  const header = toBase64Url({ alg: "HS256", typ: "JWT" });
  const payload = toBase64Url({
    sub: DEMO_USER.id,
    email: DEMO_USER.email,
    [ROLE_CLAIM]: role,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
  });

  return `${header}.${payload}.demo-signature`;
}
