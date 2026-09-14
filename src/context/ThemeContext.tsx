import React, { createContext, useContext, useState, useEffect } from "react";

export type ThemeId = "cyber" | "titanium" | "emerald" | "midnight";

export interface ThemeDefinition {
  id: ThemeId;
  name: string;
  tagline: string;
  category: "dark" | "light";
  accentColor: string;
  accentBg: string;
  canvasBg: string;
  badgeLabel: string;
}

export const THEMES: ThemeDefinition[] = [
  {
    id: "cyber",
    name: "HyperScale Pro",
    tagline: "Real-Time Startup Telemetry & Sapphire Pulse",
    category: "dark",
    accentColor: "#3B82F6",
    accentBg: "#0B1222",
    canvasBg: "#080C16",
    badgeLabel: "HyperScale Dark",
  },
  {
    id: "titanium",
    name: "Enterprise Studio",
    tagline: "Clean Startup Light & High-Contrast Precision",
    category: "light",
    accentColor: "#2563EB",
    accentBg: "#F1F5F9",
    canvasBg: "#F8FAFC",
    badgeLabel: "Studio Light",
  },
  {
    id: "emerald",
    name: "Telemetry Mint",
    tagline: "Real-Time Quant Streams & Emerald Signal",
    category: "dark",
    accentColor: "#10B981",
    accentBg: "#061711",
    canvasBg: "#030A07",
    badgeLabel: "Telemetry Mint",
  },
  {
    id: "midnight",
    name: "Venture Violet",
    tagline: "Deep Tech Startup & Ultraviolet Horizon",
    category: "dark",
    accentColor: "#8B5CF6",
    accentBg: "#130C26",
    canvasBg: "#090616",
    badgeLabel: "Venture Violet",
  },
];

interface ThemeContextType {
  currentTheme: ThemeId;
  themeConfig: ThemeDefinition;
  setTheme: (theme: ThemeId) => void;
  availableThemes: ThemeDefinition[];
  isDark: boolean;
  toggleDarkLight: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = "maha_active_theme_v2";

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentTheme, setCurrentThemeState] = useState<ThemeId>(() => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY) as ThemeId;
    if (saved && THEMES.some((t) => t.id === saved)) {
      return saved;
    }
    return "cyber";
  });

  const themeConfig = THEMES.find((t) => t.id === currentTheme) || THEMES[0];
  const isDark = themeConfig.category === "dark";

  useEffect(() => {
    localStorage.setItem(THEME_STORAGE_KEY, currentTheme);

    const root = document.documentElement;
    root.setAttribute("data-theme", currentTheme);
    if (isDark) {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
    }

    // Direct background synchronization to prevent any flash or desync
    root.style.backgroundColor = themeConfig.canvasBg;
    if (document.body) {
      document.body.style.backgroundColor = themeConfig.canvasBg;
    }

    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", themeConfig.canvasBg);
    }
  }, [currentTheme, isDark, themeConfig.canvasBg]);

  const setTheme = (theme: ThemeId) => {
    if (THEMES.some((t) => t.id === theme)) {
      setCurrentThemeState(theme);
    }
  };

  const toggleDarkLight = () => {
    if (isDark) {
      setTheme("titanium");
    } else {
      setTheme("cyber");
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        themeConfig,
        setTheme,
        availableThemes: THEMES,
        isDark,
        toggleDarkLight,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
