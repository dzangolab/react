import { useTranslation } from "@dzangolab/react-i18n";

interface Properties {
  holder?: string;
  url?: string;
  year: number;
}

const Copyright = ({ holder, url, year }: Properties) => {
  const { t } = useTranslation("app");

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
    <div className="copyright">
      &copy; {year} {t("footer.copyright")}
    </div>
  );
};

export default Copyright;
