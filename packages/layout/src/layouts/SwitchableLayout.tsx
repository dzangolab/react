import BasicLayout from "./BasicLayout";
import CollapsibleSidebarLayout from "./CollapsibleSidebarLayout";

interface Properties {
  children: React.ReactNode;
  header: React.ReactNode;
  footer?: React.ReactNode;
  localSwitcher?: React.ReactNode;
  menuToggle?: React.ReactNode;
  mainMenuRoutes?: {
    name: string;
    route: string;
    icon?: React.ReactNode;
  }[];
  mainMenuOrientation?: "horizontal" | "vertical";
  userMenu?: React.ReactNode;
  mainMenu?: React.ReactNode;
  logoRoute?: string;
  sidebar?: React.ReactNode;
  displaySidebarMenuIcon?: boolean;
  displaySidebar?: boolean;
  layoutType?: "sidebar" | "basic";
}

export const SwitchableLayout = ({
  children,
  footer,
  header,
  sidebar,
  layoutType = "basic",
  mainMenuRoutes,
  displaySidebarMenuIcon,
  displaySidebar = true,
  localSwitcher,
  logoRoute,
  mainMenu,
  mainMenuOrientation,
  menuToggle,
  userMenu,
}: Properties) => {
  switch (layoutType) {
    case "sidebar":
      return (
        <CollapsibleSidebarLayout
          {...{
            children,
            footer,
            header,
            sidebar,
            mainMenuRoutes,
            displaySidebarMenuIcon,
            localSwitcher,
            logoRoute,
            mainMenu,
            mainMenuOrientation,
            menuToggle,
            userMenu,
            displaySidebar,
          }}
        />
      );

    default:
      return (
        <BasicLayout
          {...{
            children,
            footer,
            header,
            mainMenuRoutes,
            localSwitcher,
            logoRoute,
            mainMenu,
            mainMenuOrientation,
            menuToggle,
            userMenu,
          }}
        />
      );
  }
};
