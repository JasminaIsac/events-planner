export const USER_ROLES = {
  ADMIN: "Admin",
  ORGANIZER: "Organizer",
  VIEWER: "Viewer",
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type UpdateUserDto = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export type ChangePasswordDto = {
  currentPassword: string;
  newPassword: string;
};
