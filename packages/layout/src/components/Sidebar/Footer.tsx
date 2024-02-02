import { LocaleSwitcher } from "@dzangolab/react-i18n";

import useConfig from "@/hooks/useConfig";

import Copyright from "../Copyright";
import Version from "../Version";

type SidebarFooterProperties = {
  localeSwitcher?: React.ReactNode;
};

const year = new Date().getFullYear();

export const SidebarFooter = ({ localeSwitcher }: SidebarFooterProperties) => {
  const appConfig = useConfig();

  return (
    <div className="sidebar-footer">
      {localeSwitcher || <LocaleSwitcher />}
      <Copyright
        holder={appConfig?.copyright?.holder}
        url={appConfig?.copyright?.url}
        year={year}
      />
      <Version version={appConfig?.appVersion} />
    </div>
  );
};
