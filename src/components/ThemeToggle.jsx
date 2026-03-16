import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="group relative w-10 h-10 flex items-center justify-center rounded-xl overflow-hidden
                 border border-white/20 bg-white/10 text-white 
                 transition-all duration-300 ease-in-out
                 hover:scale-110 active:scale-95
                 dark:bg-[#1e1e1e] dark:border-[#2b2b2b] dark:text-yellow-400"
    >
      {/* Icon Container with a subtle rotate effect */}
      <div className="relative transition-transform duration-500 flex items-center justify-center">
        {isDark ? (
          <Moon
            size={18}
            className="animate-in fade-in zoom-in spin-in-45 duration-300 text-blue-200"
          />
        ) : (
          <Sun
            size={18}
            className="animate-in fade-in zoom-in spin-in-90 duration-300"
          />
        )}
      </div>

      {/* Optional: A subtle glow effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 dark:group-hover:bg-yellow-400/20 bg-white/20 transition-opacity" />
    </button>
  );
};

export default ThemeToggle;
