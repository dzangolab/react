import { LayoutProvider, useLayoutContext } from "./Context";

type LayoutProperties = {
  children?: React.ReactNode;
  className?: string;
};

const LayoutComponent = ({ children, className }: LayoutProperties) => {
  const { menuMobileOpen } = useLayoutContext();

  return (
    <div
      className={`dz-layout ${className || ""}`}
      aria-expanded={menuMobileOpen}
    >
      {children}
    </div>
  );
};

export const Layout = ({ children, className }: LayoutProperties) => {
  return (
    <LayoutProvider>
      <LayoutComponent className={className}>{children}</LayoutComponent>
    </LayoutProvider>
  );
};
