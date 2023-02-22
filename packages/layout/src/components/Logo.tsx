import React from "react";

interface Properties {
  route?: string;
  src?: string;
}

const Logo = ({ route, src }: Properties) => {
  return (
    <div className="logo">
      <a href={route}>
        <img src={src} alt="logo" />
      </a>
    </div>
  );
};

export default Logo;
