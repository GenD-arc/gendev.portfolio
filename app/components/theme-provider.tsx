"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { ThemeName, ThemeConfig } from "../types/theme";
import { themes, getThemeByMonth } from "../config/themes";

interface ThemeContextType {
  theme: ThemeConfig;
  themeName: ThemeName;
  isAutoMode: boolean;
  replayKey: number;
  setThemeByName: (name: ThemeName) => void;
  setAutoMode: () => void;
}

const fallbackTheme: ThemeConfig = {
  name: "winter",
  label: "Winter",
  timeRange: [12, 2],
  colors: {
    primary: "#888888",
    secondary: "#999999",
    accent: "#777777",
    background: "from-[#050a1a] via-[#0d1835] to-[#132050]",
    surface: "rgba(255, 255, 255, 0.04)",
    text: "#EFF6FF",
    textSecondary: "#BFDBFE",
    gradient: "from-[#888888] to-[#999999]",
    border: "rgba(150, 150, 150, 0.2)",
  },
  icon: "🎨",
};

const ThemeContext = createContext<ThemeContextType>({
  theme: fallbackTheme,
  themeName: "winter",
  isAutoMode: true,
  replayKey: 0,
  setThemeByName: () => {},
  setAutoMode: () => {},
});

function getClientThemeName(): ThemeName {
  if (typeof window === "undefined") return "winter";
  const month = new Date().getMonth() + 1;
  return getThemeByMonth(month).name;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Use lazy initializer — runs once, no effect needed
  const [themeName, setThemeName] = useState<ThemeName>(getClientThemeName);
  const [isAutoMode, setIsAutoMode] = useState(true);
  const [replayKey, setReplayKey] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Mark as mounted after first paint — avoids layout shift
  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const setThemeByName = useCallback((name: ThemeName) => {
    setIsAutoMode(false);
    setThemeName(name);
    setReplayKey((k) => k + 1);
  }, []);

  const setAutoMode = useCallback(() => {
    setIsAutoMode(true);
    const month = new Date().getMonth() + 1;
    setThemeName(getThemeByMonth(month).name);
    setReplayKey((k) => k + 1);
  }, []);

  // Check season change every 30 minutes — no immediate setState
  useEffect(() => {
    if (!isAutoMode || !mounted) return;

    const interval = setInterval(() => {
      const month = new Date().getMonth() + 1;
      const detected = getThemeByMonth(month);
      setThemeName((prev) => {
        if (detected.name !== prev) {
          setReplayKey((k) => k + 1);
          return detected.name;
        }
        return prev;
      });
    }, 1800000);

    return () => clearInterval(interval);
  }, [isAutoMode, mounted]);

  const theme = useMemo(
    () => themes.find((t) => t.name === themeName) || themes[3],
    [themeName]
  );

  const displayTheme = mounted ? theme : fallbackTheme;

  const contextValue = useMemo(
    () => ({
      theme: displayTheme,
      themeName,
      isAutoMode,
      replayKey,
      setThemeByName,
      setAutoMode,
    }),
    [displayTheme, themeName, isAutoMode, replayKey, setThemeByName, setAutoMode]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);