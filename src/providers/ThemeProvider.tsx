import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

type ThemeType = "light" | "dark";

interface ThemeContextType {
  theme: ThemeType;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({ 
  theme: "light",
  toggleTheme: () => {} 
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeType>("light");
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const mousePositionRef = useRef({ x: 50, y: 50 });

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as ThemeType | null;
    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
    } else if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }

    const handleMouseMove = (event: MouseEvent) => {
      mousePositionRef.current = {
        x: (event.clientX / window.innerWidth) * 100,
        y: (event.clientY / window.innerHeight) * 100,
      };
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const applyThemeWithoutAnimation = useCallback((currentTheme: ThemeType) => {
    const root = document.documentElement;
    const isDark = currentTheme === "dark";

    root.classList.toggle("dark", isDark);
    document.body.style.backgroundColor = isDark ? "#252525" : "#ffffff";
    document.body.style.color = isDark ? "#ffffff" : "#000000";
    localStorage.setItem("theme", currentTheme);
  }, []);

  const applyThemeWithAnimation = useCallback((currentTheme: ThemeType) => {
    const root = document.documentElement;
    const isDark = currentTheme === "dark";
    const { x, y } = mousePositionRef.current;
    const overlay = document.createElement("div");

    overlay.className = isDark
      ? "theme-transition-overlay theme-transition-to-dark"
      : "theme-transition-overlay theme-transition-to-light";

    root.style.setProperty("--x", `${x}%`);
    root.style.setProperty("--y", `${y}%`);
    document.body.classList.add("theme-transition");
    document.body.appendChild(overlay);

    root.classList.toggle("dark", isDark);
    window.setTimeout(() => {
      document.body.style.backgroundColor = isDark ? "#252525" : "#ffffff";
      document.body.style.color = isDark ? "#ffffff" : "#000000";
    }, 100);

    localStorage.setItem("theme", currentTheme);

    window.setTimeout(() => {
      overlay.remove();
      document.body.classList.remove("theme-transition");
    }, 1000);
  }, []);

  useEffect(() => {
    if (isInitialLoad) {
      setIsInitialLoad(false);
      applyThemeWithoutAnimation(theme);
      return;
    }

    applyThemeWithAnimation(theme);
  }, [theme, isInitialLoad, applyThemeWithoutAnimation, applyThemeWithAnimation]);

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => prevTheme === "light" ? "dark" : "light");
  }, []);

  const contextValue = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
