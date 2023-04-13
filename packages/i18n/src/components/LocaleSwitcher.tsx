import { DropdownMenu } from "@dzangolab/react-ui";
import { useTranslation } from "react-i18next";

import "../css/locale-switcher.css";

const LocaleSwitcher = () => {
  const { i18n, t } = useTranslation("locales");

  const changeLocale = (newLocale: string) => {
    i18n.changeLanguage(newLocale);
  };

  const locales =
    i18n.options.supportedLngs &&
    i18n.options.supportedLngs
      .filter((locale) => locale !== "cimode" && i18n.options.debug) // Filter out cimode from options. The mode shows key e.g. locale.english as value.
      .map((locale) => {
        return {
          selected: i18n.language === locale,
          key: locale,
          onClick: () => changeLocale(locale),
          label: t(`locales.${locale}`),
        };
      });

  return (
    <DropdownMenu
      className="locale-switcher"
      dropdownMenu={{ menuItems: locales || [] }}
      label={t(`locales.${i18n.language}`)}
    />
  );
};

export default LocaleSwitcher;
