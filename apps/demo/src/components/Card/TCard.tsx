import React, { CSSProperties } from "react";

import "./TCard.css";

interface IProperties extends React.HTMLAttributes<HTMLElement> {}

const TCard: React.FC<IProperties> = ({ children, ...properties }) => {
  return (
    <div className="TCard" {...properties}>
      {children}
    </div>
  );
};

const Title: React.FC<
  Pick<CSSProperties, "fontSize" | "color"> & { children: string }
> = ({ children, ...properties }) => {
  return <h1 {...properties}>{children}</h1>;
};

const Header: React.FC<IProperties> = ({ children, ...properties }) => {
  return <header {...properties}>{children}</header>;
};

const Footer: React.FC<IProperties> = ({ children, ...properties }) => {
  return <footer {...properties}>{children}</footer>;
};

const Body: React.FC<IProperties> = ({ children, ...properties }) => {
  return (
    <div className="card-body" {...properties}>
      {children}
    </div>
  );
};

export default Object.assign(TCard, {
  title: Title,
  header: Header,
  footer: Footer,
  body: Body,
});
