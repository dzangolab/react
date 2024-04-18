import { useMediaQuery } from "@dzangolab/react-ui";

import { LayoutProvider, useLayoutContext } from "./Context";

type LayoutProperties = {
  children?: React.ReactNode;
  className?: string;
  fixed?: boolean;
};

const LayoutComponent = ({
  children,
  className,
  fixed = false,
}: LayoutProperties) => {
  const { menuDesktopOpen, menuMobileOpen } = useLayoutContext();
  const isSmallScreen = useMediaQuery("(max-width: 576px)");

  return (
    <div
      className={`dz-layout ${className || ""} ${
        fixed ? "fixed" : ""
      }`.trimEnd()}
      aria-expanded={isSmallScreen ? menuMobileOpen : menuDesktopOpen}
    >
      {children}
    </div>
  );
};

export const Layout = ({ children, className, fixed }: LayoutProperties) => {
  return (
    <LayoutProvider>
      <LayoutComponent className={className} fixed={fixed}>
        {children}
      </LayoutComponent>
    </LayoutProvider>
  );
};
