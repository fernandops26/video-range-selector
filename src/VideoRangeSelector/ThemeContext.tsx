// VideoRangeSelector/theme/ThemeContext.tsx
import React, { createContext, useContext } from "react";
import { Theme } from "./types";

export const defaultTheme: Theme = {
  colors: {
    primary: "#ef4444",
    overlay: "rgba(248, 113, 113, 0.3)",
  },
};

const ThemeContext = createContext<Theme>(defaultTheme);

export const ThemeProvider: React.FC<{
  theme?: Partial<Theme>;
  children: React.ReactNode;
}> = ({ theme, children }) => {
  const mergedTheme = { ...defaultTheme, ...theme };
  return (
    <ThemeContext.Provider value={mergedTheme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
