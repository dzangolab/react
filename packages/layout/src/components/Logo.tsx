import React from "react";
import { Link, useInRouterContext } from "react-router-dom";

interface Properties {
  route?: string;
  src?: string;
  alt?: string;
}

const Logo = ({ route = "/", src, alt = "My app" }: Properties) => {
  const hasRouterContext = useInRouterContext();

  const renderLogo = () => {
    if (src) {
      return <img src={src} alt={alt} />;
    }

    return (
      <span className="logo-default">
        <span>{alt[0]}</span>
        <span>{alt}</span>
      </span>
    );
  };

  return (
    <div className="logo">
      {hasRouterContext ? (
        <Link to={route}>{renderLogo()}</Link>
      ) : (
        <a href={route}>{renderLogo()}</a>
      )}
    </div>
  );
};

export default Logo;
