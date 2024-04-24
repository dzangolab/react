import { Layout } from "..";

interface IProperties {
  className?: string;
  children: React.ReactNode;
  collapsible?: boolean;
  displayHeader?: boolean;
  displaySidebar?: boolean;
  customHeader?: React.ReactNode;
  customSidebar?: React.ReactNode;
}

const CollapsibleSidebarHeaderLayout = ({
  className,
  children,
}: IProperties) => {
  return (
    <Layout className={`header-sidebar ${className || ""}`.trimEnd()}>
      <header></header>
      <aside></aside>
      <main>{children}</main>
    </Layout>
  );
};

export default CollapsibleSidebarHeaderLayout;
