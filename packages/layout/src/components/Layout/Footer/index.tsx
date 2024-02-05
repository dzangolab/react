import React from "react";

import { Copyright, Version } from "../common";

interface FooterProperties {
  children?: React.ReactNode;
}

export const Footer = ({ children }: FooterProperties) => {
  const renderContent = () => {
    return (
      <>
        <Copyright />
        <Version />
      </>
    );
  };
  return <footer>{children || renderContent()}</footer>;
};
