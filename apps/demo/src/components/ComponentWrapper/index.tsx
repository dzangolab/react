import React from "react";

import "./index.css";

interface IProperties {
  children: React.ReactNode;
  onBack: () => void;
  title: string;
}

const ComponentWrapper: React.FC<IProperties> = ({
  children,
  onBack,
  title,
}) => {
  return (
    <div className="component-wrapper">
      <div className="wrapper-header">
        <button className="btn-back" onClick={onBack}>
          &lt;
        </button>
        <h1>{title}</h1>
      </div>
      {children}
    </div>
  );
};

export default ComponentWrapper;
