import { DropdownMenu, DropdownMenuProperties } from "@dzangolab/react-ui";
import { useTranslation } from "react-i18next";

import "../css/locale-switcher.css";

export type LocalSwitcherProperties = Omit<DropdownMenuProperties, "menu">;

const LocaleSwitcher = ({ ...menuOptions }: LocalSwitcherProperties) => {
  const { i18n, t } = useTranslation("locales");

  const changeLocale = (newLocale: string) => {
    i18n.changeLanguage(newLocale);

    document.documentElement.lang = newLocale;
  };

  const locales =
    i18n.options.supportedLngs &&
    i18n.options.supportedLngs
      .filter((locale) => locale !== "cimode") // Filter out cimode from options. The mode shows key e.g. locale.english as value.
      .map((locale) => {
        return {
          onClick: () => changeLocale(locale),
          label: t(`locales.${locale}`),
        };
      });

  if (!locales || !(locales.length > 1)) {
    return null;
  }

  return (
    <span className="locale-switcher">
      <DropdownMenu
        menu={locales || []}
        label={t(`locales.${i18n.language}`)}
        {...menuOptions}
      />
    </span>
  );
};

export default LocaleSwitcher;
