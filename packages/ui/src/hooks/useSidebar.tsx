import { useContext } from "react";

import {
  sidebarContext,
  SidebarContextProperties,
} from "../context/SidebarProvider";

export const useSidebar = (): SidebarContextProperties => {
  const context = useContext(sidebarContext);

  if (context === undefined) {
    throw new Error("SidebarProvider is required!");
  }

  return context;
};
