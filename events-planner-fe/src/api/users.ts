import type { ChangePasswordDto, UpdateUserDto, User } from "~/types";

import { apiFetch } from "./client";

export const getUsers = () => {
  return apiFetch<User[]>("/users");
};

export const getUserById = (id: string) => {
  return apiFetch<User>(`/users/${id}`);
};

export const getCurrentUser = () => {
  return apiFetch<User>(`/users/me`);
};

export const updateCurrentUser = (user: UpdateUserDto) => {
  return apiFetch<User>(`/users/me`, {
    method: "PUT",
    body: JSON.stringify(user),
  });
};

export const changePassword = (dto: ChangePasswordDto) => {
  return apiFetch<void>(`/users/me/change-password`, {
    method: "POST",
    body: JSON.stringify(dto),
  });
};

export const deactivateUser = (id: string) => {
  return apiFetch<void>(`/users/${id}/deactivate`, {
    method: "DELETE",
  });
};
