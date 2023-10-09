import BasicLayout from "./BasicLayout";
import CollapsibleSidebarLayout from "./CollapsibleSidebarLayout";

interface Properties {
  children: React.ReactNode;
  footer?: React.ReactNode;
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  layoutType?: "sidebar" | "basic";
}

export const SwitchableLayout = ({
  children,
  footer,
  header,
  sidebar,
  layoutType = "basic",
}: Properties) => {
  return (
    <>
      {layoutType === "basic" ? (
        <BasicLayout {...{ children, footer, header }} />
      ) : (
        <CollapsibleSidebarLayout {...{ children, footer, header, sidebar }} />
      )}
    </>
  );
};
