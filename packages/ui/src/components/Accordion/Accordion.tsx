import React, { ReactNode } from "react";

type Properties = {
  children: ReactNode;
  title: string;
};

const Accordion: React.FC<Properties> = ({ children }) => {
  return (
    <div role="region" className="accordion-panel">
      {children}
    </div>
  );
};

export default Accordion;
