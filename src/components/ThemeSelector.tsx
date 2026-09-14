import React, { useState, useRef, useEffect } from "react";
import { useTheme, ThemeId } from "../context/ThemeContext";
import { Sparkles, Sun, Moon, Check, ChevronDown } from "lucide-react";

interface ThemeSelectorProps {
  compact?: boolean;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  compact = false,
}) => {
  const {
    currentTheme,
    themeConfig,
    setTheme,
    availableThemes,
    isDark,
    toggleDarkLight,
  } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-900 /80 backdrop-blur-md text-xs font-mono transition-all hover:border-cyan-500 hover:shadow-sm cursor-pointer"
        title="Change Aesthetic Theme"
      >
        <span
          className="w-2.5 h-2.5 rounded-full ring-2 shadow-xs transition-colors"
          style={{
            backgroundColor: themeConfig.accentColor,
            boxShadow: `0 0 8px ${themeConfig.accentColor}`,
          }}
        />
        {!compact ? (
          <>
            <span className="font-semibold text-neutral-800 dark:text-neutral-300">
              {themeConfig.badgeLabel}
            </span>
            <ChevronDown
              className={`w-3 h-3 text-neutral-500 dark:text-neutral-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
            />
          </>
        ) : isDark ? (
          <Moon className="w-3.5 h-3.5 text-cyan-400" />
        ) : (
          <Sun className="w-3.5 h-3.5 text-amber-500" />
        )}
      </button>

      {/* Theme Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-2xl p-2 z-50 shadow-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 backdrop-blur-xl animate-in fade-in slide-in-from-top-2">
          <div className="px-3 py-2 border-b border-neutral-100 flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-bold flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span>Theme Aesthetics</span>
            </span>
            <button
              onClick={() => {
                toggleDarkLight();
                setIsOpen(false);
              }}
              className="text-[10px] font-mono text-cyan-600 hover:underline flex items-center gap-1 cursor-pointer"
            >
              {isDark ? (
                <Sun className="w-3 h-3" />
              ) : (
                <Moon className="w-3 h-3" />
              )}
              <span>{isDark ? "Switch Light" : "Switch Dark"}</span>
            </button>
          </div>

          <div className="mt-1 space-y-1">
            {availableThemes.map((theme) => {
              const isSelected = currentTheme === theme.id;
              return (
                <button
                  key={theme.id}
                  onClick={() => {
                    setTheme(theme.id);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl transition-all flex items-center justify-between group cursor-pointer ${
                    isSelected
                      ? "bg-neutral-100 dark:bg-neutral-800/80 font-bold shadow-xs"
                      : "hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-3 h-3 rounded-full transition-transform group-hover:scale-125"
                      style={{
                        backgroundColor: theme.accentColor,
                        boxShadow: isSelected
                          ? `0 0 10px ${theme.accentColor}`
                          : undefined,
                      }}
                    />
                    <div>
                      <div className="text-xs font-semibold text-neutral-900 dark:text-white flex items-center gap-1.5">
                        <span>{theme.name}</span>
                        <span className="text-[9px] uppercase px-1.5 py-0.2 rounded bg-neutral-200/60 text-neutral-600 dark:text-neutral-300 font-mono">
                          {theme.category}
                        </span>
                      </div>
                      <div className="text-[10px] text-neutral-500 dark:text-neutral-400 truncate w-40">
                        {theme.tagline}
                      </div>
                    </div>
                  </div>
                  {isSelected && (
                    <Check className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
