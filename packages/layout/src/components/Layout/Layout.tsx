import { LayoutProvider, useLayoutContext } from "./Context";

type LayoutProperties = {
  children?: React.ReactNode;
  className?: string;
  fixed?: boolean;
};

const LayoutComponent = ({ children, className, fixed }: LayoutProperties) => {
  const { menuMobileOpen } = useLayoutContext();

  return (
    <div
      className={`dz-layout ${className || ""} ${
        fixed ? "fixed" : ""
      }`.trimEnd()}
      aria-expanded={menuMobileOpen}
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
