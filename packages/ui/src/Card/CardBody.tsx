import React from "react";

interface Properties {
  children: React.ReactNode;
}

export const CardBody: React.FC<Properties> = ({ children }) => {
  return <div className="dz-card-body">{children}</div>;
};
