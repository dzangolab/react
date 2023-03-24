import React from "react";

import "./index.css";

interface IProperties {
  children: React.ReactNode;
  onBack: () => void;
  title: string;
}

const PageWrapper: React.FC<IProperties> = ({ children, onBack, title }) => {
  return (
    <div className="page-wrapper">
      <div className="page-header">
        <button className="btn-back" onClick={onBack}>
          &lt;
        </button>
        <h1>{title}</h1>
      </div>
      {children}
    </div>
  );
};

export default PageWrapper;
