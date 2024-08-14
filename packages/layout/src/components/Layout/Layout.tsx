import { useMediaQuery } from "@dzangolab/react-ui";

import { LayoutProvider, useLayoutContext } from "./Context";

type LayoutProperties = {
  children?: React.ReactNode;
  className?: string;
  fixed?: boolean;
  userMenuLocation?: "sidebar" | "header";
};

const LayoutComponent = ({
  children,
  className,
  fixed,
  userMenuLocation,
}: LayoutProperties) => {
  const { menuDesktopOpen, menuMobileOpen } = useLayoutContext();
  const isLargeScreen = useMediaQuery("(min-width: 576px)");

  return (
    <div
      className={`dz-layout ${className || ""} ${
        fixed ? "fixed" : ""
      }`.trimEnd()}
      aria-expanded={isLargeScreen ? menuDesktopOpen : menuMobileOpen}
      data-user-menu-location={userMenuLocation}
    >
      {children}
    </div>
  );
};

export const Layout = ({
  children,
  className,
  fixed,
  userMenuLocation,
}: LayoutProperties) => {
  return (
    <LayoutProvider>
      <LayoutComponent
        className={className}
        fixed={fixed}
        userMenuLocation={userMenuLocation}
      >
        {children}
      </LayoutComponent>
    </LayoutProvider>
  );
};
