import useConfig from "@/hooks/useConfig";
import Copyright from "../Copyright";
import Version from "../Version";

type SidebarFooterProps = {};

const year = new Date().getFullYear();

export const SidebarFooter = ({}: SidebarFooterProps) => {
  const appConfig = useConfig();

  return (
    <div className="footer">
      <Copyright
        holder={appConfig?.copyright?.holder}
        url={appConfig?.copyright?.url}
        year={year}
      />
      <Version version={appConfig?.appVersion} />
    </div>
  );
};
