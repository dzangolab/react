import useConfig from "@/hooks/useConfig";

interface Properties {
  children?: React.ReactNode;
  version?: string;
}

export const Version = ({ children, version: pVersion }: Properties) => {
  const appConfig = useConfig();

  const version = pVersion || appConfig?.appVersion || "[App version]";

  return <div className="version">{children || version}</div>;
};
