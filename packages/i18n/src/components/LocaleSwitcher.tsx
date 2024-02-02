import { Menu as PMenu, MenuProps as PMenuProperties } from "primereact/menu";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

import "../css/locale-switcher.css";

export type LocalSwitcherProperties = PMenuProperties;

const LocaleSwitcher = ({ ...menuOptions }: LocalSwitcherProperties) => {
  const { i18n, t } = useTranslation("locales");

  const menu = useRef<PMenu>(null);

  const changeLocale = (newLocale: string) => {
    i18n.changeLanguage(newLocale);

    document.documentElement.lang = newLocale;
  };

  const locales =
    i18n.options.supportedLngs &&
    i18n.options.supportedLngs
      .filter((locale) => locale !== "cimode" && i18n.options.debug) // Filter out cimode from options. The mode shows key e.g. locale.english as value.
      .map((locale) => {
        return {
          command: () => changeLocale(locale),
          label: t(`locales.${locale}`),
        };
      });

  return (
    <span className="locale-switcher">
      <PMenu model={locales || []} popup ref={menu} {...menuOptions} />
      <span onClick={(event) => menu?.current?.toggle(event)}>
        {t(`locales.${i18n.language}`)}
        <i className="pi pi-angle-down" style={{ fontSize: "12px" }}></i>
      </span>
    </span>
  );
};

export default LocaleSwitcher;
