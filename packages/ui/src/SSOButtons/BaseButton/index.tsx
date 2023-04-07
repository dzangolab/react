import React from "react";

import "./index.css";

export interface BaseButtonProperties {
  alignCenter?: boolean;
  alternativeText?: string;
  borderRadiusType?: "pill" | "rectangular";
  className?: string;
  handleClick?: () => void;
  imageSource: string;
  title?: string;
  variant?: "light" | "dark";
}

const BaseButton: React.FC<BaseButtonProperties> = ({
  alignCenter = false,
  alternativeText,
  borderRadiusType = "rectangular",
  className = "",
  handleClick,
  imageSource,
  title,
  variant = "light",
}) => {
  return (
    <button
      onClick={handleClick}
      className={`sso-button ${className} ${variant} ${borderRadiusType} ${
        alignCenter ? "center" : ""
      }`}
    >
      <img
        src={imageSource}
        alt={alternativeText ? alternativeText : `${className} logo`}
      />
      <span>{title}</span>
    </button>
  );
};

export default BaseButton;
