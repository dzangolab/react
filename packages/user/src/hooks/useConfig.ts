import { configContext } from "@dzangolab/react-config";
import { useContext } from "react";

export const useConfig = () => {
  const context = useContext(configContext);

  if (context === undefined) {
    throw new Error("ConfigProvider is required!");
  }

  return context;
};
