
import { createContext, useContext, useState, useEffect, useCallback } from "react";

type ThemeType = "light" | "dark";

interface ThemeContextType {
  theme: ThemeType;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({ 
  theme: "light",
  toggleTheme: () => {} 
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeType>("light");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Initialize theme from localStorage or system preference without triggering a full reflow
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as ThemeType;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }
    
    // Track mouse position for theme transition effect
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ 
        x: e.clientX / window.innerWidth * 100,
        y: e.clientY / window.innerHeight * 100
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Update document when theme changes - without reload
  useEffect(() => {
    if (isInitialLoad) {
      // Skip animation on initial load
      setIsInitialLoad(false);
      applyThemeWithoutAnimation(theme);
      return;
    }

    applyThemeWithAnimation(theme);
    
  }, [theme, isInitialLoad]);

  // Apply theme without animation for initial load
  const applyThemeWithoutAnimation = useCallback((currentTheme: ThemeType) => {
    const root = document.documentElement;
    
    if (currentTheme === "dark") {
      root.classList.add("dark");
      document.body.style.backgroundColor = "#252525";
      document.body.style.color = "#ffffff";
    } else {
      root.classList.remove("dark");
      document.body.style.backgroundColor = "#ffffff";
      document.body.style.color = "#000000";
    }
    
    // Store theme preference
    localStorage.setItem("theme", currentTheme);
  }, []);

  // Apply theme with animation for toggle interactions
  const applyThemeWithAnimation = useCallback((currentTheme: ThemeType) => {
    const root = document.documentElement;
    
    // Create overlay for animation
    const overlay = document.createElement('div');
    overlay.className = currentTheme === 'light' 
      ? 'theme-transition-overlay theme-transition-to-light' 
      : 'theme-transition-overlay theme-transition-to-dark';
    
    // Set the center of the animation to the current mouse position
    document.documentElement.style.setProperty('--x', `${mousePosition.x}%`);
    document.documentElement.style.setProperty('--y', `${mousePosition.y}%`);
    
    // Add transition class for animation
    document.body.classList.add("theme-transition");
    
    document.body.appendChild(overlay);
    
    // Apply theme change
    if (currentTheme === "dark") {
      root.classList.add("dark");
      setTimeout(() => {
        document.body.style.backgroundColor = "#252525";
        document.body.style.color = "#ffffff";
      }, 100);
    } else {
      root.classList.remove("dark");
      setTimeout(() => {
        document.body.style.backgroundColor = "#ffffff";
        document.body.style.color = "#000000";
      }, 100);
    }
    
    // Store theme preference
    localStorage.setItem("theme", currentTheme);
    
    // Remove overlay and transition class after animation
    setTimeout(() => {
      if (document.body.contains(overlay)) {
        document.body.removeChild(overlay);
      }
      document.body.classList.remove("theme-transition");
    }, 1000);
  }, [mousePosition]);

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => prevTheme === "light" ? "dark" : "light");
    
    // Log for debugging
    console.log("Theme toggled without page refresh");
  }, []);

  const contextValue = {
    theme,
    toggleTheme
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
