import React, { createContext, useState } from "react";

import type { ReactNode } from "react";

interface ToggleContentInterface {
  children: ReactNode;
  collapseOnDoubleClick?: boolean;
  defaultActiveKey: string;
}

export interface ToggleContentContextInterface {
  active: string | string[];
  defaultActiveKey: string;
  handleClick: (key: string) => void;
}

export const ToggleContentContext =
  createContext<ToggleContentContextInterface | null>(null);

const ToggleContent = ({
  collapseOnDoubleClick = false,
  defaultActiveKey,
  children,
}: ToggleContentInterface) => {
  const [active, setActive] = useState(defaultActiveKey);

  const handleClick = (key: string) => {
    if (!collapseOnDoubleClick) setActive(key);
    else {
      if (active === key) setActive("");
    }
  };

  const value: ToggleContentContextInterface = {
    active,
    defaultActiveKey,
    handleClick,
  };

  return (
    <ToggleContentContext.Provider value={value}>
      {children}
    </ToggleContentContext.Provider>
  );
};

export default ToggleContent;
