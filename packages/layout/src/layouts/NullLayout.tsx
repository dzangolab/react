import React from "react";

interface Properties {
  children: React.ReactNode;
}

const NullLayout: React.FC<Properties> = ({ children }: Properties) => {
  return <>{children}</>;
};

export default NullLayout;
