import { useContext } from "react";

import { configContext } from "@/context/ConfigProvider";

export const useConfig = () => {
  const context = useContext(configContext);

  if (context === undefined) {
    throw new Error("ConfigProvider is required!");
  }

  return context;
};
