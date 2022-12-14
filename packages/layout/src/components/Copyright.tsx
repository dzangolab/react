import { useTranslation } from "@dzangolab/react-i18n";

interface Properties {
  holder?: string;
  url?: string;
  year: number;
}

const Copyright = ({ holder, url, year }: Properties) => {
  const { t } = useTranslation("app");

  if (holder) {
    const link = (
      <a href={url} target="_blank" rel="noreferrer">
        {holder}
      </a>
    );

    return (
      <div className="copyright">
        &copy; {year} {link}. {t("footer.copyright")}
      </div>
    );
  }

  return (
    <div className="copyright">
      &copy; {year}. {t("footer.copyright")}
    </div>
  );
};

export default Copyright;
