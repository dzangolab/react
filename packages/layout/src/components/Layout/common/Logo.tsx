import React, { useMemo } from "react";
import { Link, useInRouterContext } from "react-router-dom";

import useConfig from "@/hooks/useConfig";

interface Properties {
  alt?: string;
  children?: React.ReactNode;
  route?: string;
  src?: string;
}

export const Logo = ({
  alt: pAlt,
  children,
  route: pRoute,
  src: pSource,
}: Properties) => {
  const { appName, layout: layoutConfig } = useConfig();

  const hasRouterContext = useInRouterContext();

  const parseLogoAlt = useMemo(() => {
    if (!appName) {
      return;
    }

    return appName.replace("@", "").replace("/", " ");
  }, [appName]);

  const route = pRoute || layoutConfig?.logoRoute || "/";
  const source = pSource || layoutConfig?.logo;
  const alt = pAlt || layoutConfig?.logoAlt || parseLogoAlt || "My app";

  const renderLogo = () => {
    if (source) {
      return <img src={source} alt={alt} />;
    }

    return (
      <span className="logo-default">
        <span>{alt[0]}</span>
        <span>{alt}</span>
      </span>
    );
  };

  const renderContent = () => {
    return (
      <>
        {hasRouterContext ? (
          <Link to={route}>{renderLogo()}</Link>
        ) : (
          <a href={route}>{renderLogo()}</a>
        )}
      </>
    );
  };

  return <div className="logo">{children || renderContent()}</div>;
};
