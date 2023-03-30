import React from "react";

import "./TCard.css";

interface IProperties extends React.HTMLAttributes<HTMLElement> {}

const TCard: React.FC<IProperties> = ({ children, ...properties }) => {
  return (
    <div className="t-card" {...properties}>
      {children}
    </div>
  );
};

const CardWrapper: React.FC<IProperties> = ({ children, ...properties }) => {
  return (
    <div className="card-wrapper" {...properties}>
      {children}
    </div>
  );
};

const CardTitle: React.FC<{ children: string }> = ({ children }) => {
  return <h3>{children}</h3>;
};

const CardSubtitle: React.FC<{ children: string }> = ({ children }) => {
  return <h4>{children}</h4>;
};

const CardHeader: React.FC<IProperties> = ({ children, ...properties }) => {
  return <header {...properties}>{children}</header>;
};

const CardFooter: React.FC<IProperties> = ({ children, ...properties }) => {
  return <footer {...properties}>{children}</footer>;
};

const CardBody: React.FC<IProperties> = ({ children, ...properties }) => {
  return (
    <div className="card-body" {...properties}>
      {children}
    </div>
  );
};

export {
  CardBody,
  CardFooter,
  CardHeader,
  CardSubtitle,
  CardTitle,
  CardWrapper,
  TCard,
};
