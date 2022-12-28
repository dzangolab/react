import React from "react";

interface Properties {
  title?: string;
  toolbar?: React.ReactNode;
}

const PageTitle = ({ title, toolbar }: Properties) => {
  return (
    <div className="page-title">
      {title && <h1>{title}</h1>}

      {toolbar && <div className="toolbar">{toolbar}</div>}
    </div>
  );
};

export default PageTitle;
