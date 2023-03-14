import React from "react";

interface Properties {
  route?: string;
  source?: string;
}

const Logo = ({ route = "/", source = "/logo.png" }: Properties) => {
  return (
    <div className="logo">
      <a href={route}>
        <img src={source} alt="logo" />
      </a>
    </div>
  );
};

export default Logo;
