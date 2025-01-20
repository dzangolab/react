import React from "react";
import { Link } from "react-router-dom";

interface Properties {
  className?: string;
  external?: boolean;
  label: React.ReactNode;
  target?: string;
  to: string;
  underlined?: boolean;
}

const InlineLink = ({
  className = "",
  external = false,
  label,
  target,
  to,
  underlined = false,
}: Properties) => {
  const linkClassName =
    `native-link ${underlined ? "underlined" : ""} ${className}`
      .replace(/\s+/g, " ")
      .trim();

  if (external) {
    return (
      <a href={to} target={target || "_blank"} className={linkClassName}>
        {label}
      </a>
    );
  }

  return (
    <Link to={to} className={linkClassName}>
      {label}
    </Link>
  );
};

export default InlineLink;
