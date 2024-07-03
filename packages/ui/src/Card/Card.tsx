import React from "react";

interface CardProperties {
  outlined?: boolean;
  children: React.ReactNode;
}

export const Card: React.FC<CardProperties> = ({
  children,
  outlined = false,
}) => {
  return (
    <div className="dz-card" data-variant-outlined={outlined}>
      {children}
    </div>
  );
};
