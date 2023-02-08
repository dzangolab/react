import React, { ReactNode } from "react";
import "./subpane.css";

type Properties = {
  children: ReactNode;
  title: string;
  icon?: string;
};

const SubPane: React.FC<Properties> = ({ children }) => {
  return <div className="sub-pane">{children}</div>;
};

export default SubPane;
