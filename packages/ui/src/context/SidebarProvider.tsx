import React, { createContext, useMemo, useState } from "react";

interface Properties {
  children: React.ReactNode;
}

interface SidebarContextProperties {
  open: boolean;
  toggleSidebar: () => void;
}

const sidebarContext = createContext<SidebarContextProperties | undefined>(
  undefined
);

const SidebarProvider = ({ children }: Properties) => {
  const [open, setOpen] = useState<boolean>(true);

  const toggleSidebar = () => {
    setOpen((previous) => !previous);
  };

  const providerValue = useMemo(() => ({ open, toggleSidebar }), [open]);

  return (
    <sidebarContext.Provider value={providerValue}>
      {children}
    </sidebarContext.Provider>
  );
};

export default SidebarProvider;
export { sidebarContext };
export type { SidebarContextProperties };
