import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext(null);

const STORAGE_KEY = "theme";
const THEMES = {
  LIGHT: "light",
  DARK: "dark",
};

const normalizeTheme = (value) => {
  if (value === THEMES.DARK) return THEMES.DARK;
  if (value === THEMES.LIGHT || value === "default") return THEMES.LIGHT;
  return THEMES.LIGHT;
};

const applyTheme = (nextTheme) => {
  if (typeof document === "undefined") return;
  const isDark = nextTheme === THEMES.DARK;
  document.documentElement.classList.toggle("dark", isDark);
  document.body.classList.toggle("dark", isDark);
  document.documentElement.dataset.theme = nextTheme;
  document.documentElement.style.colorScheme = isDark ? "dark" : "light";
};

const getInitialTheme = () => {
  if (typeof window === "undefined") return THEMES.LIGHT;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return normalizeTheme(stored);
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => getInitialTheme());

  useEffect(() => {
    if (typeof window === "undefined") return;
    const next = normalizeTheme(theme);
    window.localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
  }, [theme]);

  const toggleTheme = () => {
    const next = normalizeTheme(theme) === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;
    setTheme(next);
    applyTheme(next);
  };

  const value = useMemo(() => ({ theme, setTheme, toggleTheme }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx;
};
