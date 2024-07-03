import React from "react";

interface Properties {
  children: React.ReactNode;
}

export const CardFooter: React.FC<Properties> = ({ children }) => {
  return <div className="dz-card-footer">{children}</div>;
};
