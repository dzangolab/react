import React, { ReactNode } from "react";

type Properties = {
  children: ReactNode;
  title: string;
};

const Tab: React.FC<Properties> = ({ children }) => {
  return <div className="tab">{children}</div>;
};

export default Tab;
