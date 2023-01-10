import { useState } from "react";
import { useTranslation } from "react-i18next";
import OutsideClickHandler from "react-outside-click-handler";

import "../css/locale-switcher.css";

const LocaleSwitcher = () => {
  const [expanded, setExpanded] = useState(false);

  const { i18n, t } = useTranslation("locales");

  const changeLocale = (newLocale: string) => {
    i18n.changeLanguage(newLocale);

    setExpanded(!expanded);
  };

  const locales =
    i18n.options.supportedLngs &&
    i18n.options.supportedLngs
      .filter((locale) => locale !== "cimode" && i18n.options.debug) // Filter out cimode from options. The mode shows key e.g. locale.english as value.
      .map((locale) => {
        return (
          <li
            className={`truncated ${i18n.language === locale ? "current" : ""}`}
            key={locale}
            onClick={() => changeLocale(locale)}
          >
            {t(`locales.${locale}`)}
          </li>
        );
      });

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        setExpanded(false);
      }}
    >
      <nav className={`locale-switcher ${expanded ? "expanded" : ""}`}>
        <div
          className="locale truncated"
          onClick={() => setExpanded(!expanded)}
        >
          {t(`locales.${i18n.language}`)}
          <span className={`truncated ${expanded ? "expanded" : ""}`}>
            &#9662;
          </span>
        </div>

        {expanded && <ul>{locales}</ul>}
      </nav>
    </OutsideClickHandler>
  );
};

export default LocaleSwitcher;
