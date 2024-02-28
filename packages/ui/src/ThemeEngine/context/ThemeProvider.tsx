import { createContext, useContext, useState } from "react";

import { getThemeConfig } from "../theme-config";

import type { DzTheme } from "../types";

const ThemeContext = createContext<{
  theme: DzTheme;
  setTheme: (theme: DzTheme) => void;
}>({
  theme: "auto",
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setTheme: () => {},
});

export const DzThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [theme, setTheme] = useState<DzTheme>(getThemeConfig().defaultTheme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useDzThemeContext = () => {
  return useContext(ThemeContext);
};
