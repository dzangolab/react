import React from "react";

import "./index.css";

interface IProperties {
  title?: string;
  variant?: "light" | "dark";
  handleClick?: () => void;
}

const GoogleButton: React.FC<IProperties> = ({
  title,
  variant = "light",
  handleClick,
}) => {
  return (
    <button onClick={handleClick} className={`google-button-${variant}`}>
      <img src="../../assets/images/google-icon.png" alt="Google logo" />
      <span>{title}</span>
    </button>
  );
};

export default GoogleButton;
