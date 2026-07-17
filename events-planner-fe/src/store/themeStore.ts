import { create } from "zustand";

export type ThemeMode = "light" | "dark";

type ThemeState = {
  theme: ThemeMode;
  toggleTheme: () => void;
};

export const useThemeStore = create<ThemeState>((set) => ({
  theme: "light",
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === "light" ? "dark" : "light",
    })),
}));
