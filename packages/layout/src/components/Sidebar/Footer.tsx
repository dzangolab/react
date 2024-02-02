import useConfig from "@/hooks/useConfig";

import Copyright from "../Copyright";
import Version from "../Version";

const year = new Date().getFullYear();

export const SidebarFooter = () => {
  const appConfig = useConfig();

  return (
    <div className="sidebar-footer">
      <Copyright
        holder={appConfig?.copyright?.holder}
        url={appConfig?.copyright?.url}
        year={year}
      />
      <Version version={appConfig?.appVersion} />
    </div>
  );
};
