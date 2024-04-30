import { MenuProps as PMenuProperties } from "primereact/menu";
// eslint-disable-next-line import/order
import { useTranslation } from "react-i18next";

import "../css/locale-switcher.css";
// eslint-disable-next-line import/order
import { DropdownMenuV2 as DropdownMenu } from "@dzangolab/react-ui";

export type LocalSwitcherProperties = PMenuProperties;

const LocaleSwitcher = ({ ...menuOptions }: LocalSwitcherProperties) => {
  const { i18n, t } = useTranslation("locales");

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

  if (!locales || !(locales.length > 1)) {
    return null;
  }

  return (
    <span className="locale-switcher">
      <DropdownMenu
        model={locales || []}
        menuLabel={t(`locales.${i18n.language}`)}
        {...menuOptions}
      />
    </span>
  );
};

export default LocaleSwitcher;
