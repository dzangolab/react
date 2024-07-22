import React from "react";

interface CardProperties {
  className?: string;
  outlined?: boolean;
  children: React.ReactNode;
}

export const Card: React.FC<CardProperties> = ({
  className = "",
  children,
  outlined = false,
}) => {
  return (
    <div
      className={`dz-card ${className}`.trim()}
      data-variant-outlined={outlined}
    >
      {children}
    </div>
  );
};
