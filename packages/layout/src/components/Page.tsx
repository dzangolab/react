import React from "react";

interface Properties {
  subTitle?: string;
  title?: string;
  toolbar?: React.ReactNode;
}

const Page = ({ subTitle, title, toolbar }: Properties) => {
  return (
    <div className="page">
      {title && (
        <h1>
          {title}
          {subTitle && <small>{subTitle}</small>}
        </h1>
      )}
      {toolbar && <div className="toolbar">{toolbar}</div>}
    </div>
  );
};

export default Page;
