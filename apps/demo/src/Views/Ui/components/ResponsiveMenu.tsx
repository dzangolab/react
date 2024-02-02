import { useTranslation } from "@dzangolab/react-i18n";
import { Page, ResponsiveMenu } from "@dzangolab/react-ui";

import { Section } from "../../../components/Demo";

const MENU_ROUTES = [
  {
    label: "Home",
    route: "/ui/resonponsive-menu",
  },
  {
    label: "About",
    route: "/ui/resonponsive-menu",
  },
];

export const ResponsiveMenuDemo = () => {
  const [t] = useTranslation("ui");

  return (
    <Page title={t("responsiveMenu.title")}>
      <Section title="Horizontal menu">
        <ResponsiveMenu routes={MENU_ROUTES} />
      </Section>
      <Section title="Vertical menu">
        <ResponsiveMenu routes={MENU_ROUTES} orientation="vertical" />
      </Section>
    </Page>
  );
};
