import { createContext, useContext, useState } from "react";

export type LayoutCotextType = {
  menuDesktopOpen: boolean;
  menuMobileOpen: boolean;
  setMenuDesktopOpen: (value: boolean) => void;
  setMenuMobileOpen: (value: boolean) => void;
};

export const LayoutContext = createContext<LayoutCotextType | null>(null);

type LayoutProviderProperties = {
  children?: React.ReactNode;
};

export const LayoutProvider = ({ children }: LayoutProviderProperties) => {
  const [menuDesktopOpen, setMenuDesktopOpen] = useState(true);
  const [menuMobileOpen, setMenuMobileOpen] = useState(false);

  return (
    <LayoutContext.Provider
      value={{
        menuDesktopOpen,
        menuMobileOpen,
        setMenuDesktopOpen,
        setMenuMobileOpen,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayoutContext = () => {
  const context = useContext(LayoutContext);

  if (context === null) {
    throw new Error("LayoutProvider is required!");
  }

  return context;
};
