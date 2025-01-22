import React from "react";
import { Link } from "react-router-dom";

interface Properties {
  className?: string;
  external?: boolean;
  label: React.ReactNode;
  target?: HTMLAnchorElement["target"];
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
    `inline-link ${underlined ? "underlined" : ""} ${className}`
      .replace(/\s\s/, " ")
      .trim();

  if (external) {
    return (
      <a
        href={to}
        target={target || "_blank"}
        rel="noopener noreferrer"
        className={linkClassName}
        data-testid="external-link"
      >
        {label}
      </a>
    );
  }

  return (
    <Link to={to} className={linkClassName} data-testid="internal-link">
      {label}
    </Link>
  );
};

export default InlineLink;
