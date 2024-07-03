import React from "react";

interface Properties {
  children: React.ReactNode;
}

export const CardHeader: React.FC<Properties> = ({ children }) => {
  return <div className="dz-card-header">{children}</div>;
};
