import useConfig from "@/hooks/useConfig";

interface Properties {
  children?: React.ReactNode;
  defaultMessage?: string;
  holder?: string;
  url?: string;
  year?: number;
}

export const Copyright = ({
  children,
  defaultMessage = "All rights reserved",
  holder: pHolder,
  url: pUrl,
  year: pYear,
}: Properties) => {
  const appConfig = useConfig();

  const renderContent = () => {
    const holder = pHolder || appConfig?.copyright?.holder;
    const url = pUrl || appConfig?.copyright?.url;
    const year = pYear || new Date().getFullYear();

    if (holder) {
      const holderElement = url ? (
        <a href={url} target="_blank" rel="noreferrer">
          {holder}
        </a>
      ) : (
        holder
      );

      return (
        <div className="copyright">
          &copy; {year} {holderElement}
        </div>
      );
    }

    return (
      <>
        &copy; {year} {defaultMessage}
      </>
    );
  };

  return <div className="copyright">{children || renderContent()}</div>;
};
