import React from "react";
import { Link, useInRouterContext } from "react-router-dom";

interface Properties {
  route?: string;
  source?: string;
}

const Logo = ({ route = "/", source = "/logo.png" }: Properties) => {
  const hasRouterContext = useInRouterContext();

  return (
    <div className="logo">
      {hasRouterContext ? (
        <Link to={route}>
          <img src={source} alt="logo" />
        </Link>
      ) : (
        <a href={route}>
          <img src={source} alt="logo" />
        </a>
      )}
    </div>
  );
};

export default Logo;
