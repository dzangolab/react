import { useTranslation } from "@dzangolab/react-i18n";
import { Page, ResponsiveMenu } from "@dzangolab/react-ui";

const MENU_ROUTES = [
  {
    name: "Home",
    route: "/ui-v2/resonponsive-menu",
  },
  {
    name: "About",
    route: "/ui-v2/resonponsive-menu",
  },
];

export const ResponsiveMenuDemo = () => {
  const [t] = useTranslation("ui");

  return (
    <Page title={t("v2.responsiveMenu.title")}>
      <div>
        <h3>Horizontal menu</h3>
        <ResponsiveMenu routes={MENU_ROUTES} />
      </div>
      <br />
      <div>
        <h3>Vertical menu</h3>
        <ResponsiveMenu routes={MENU_ROUTES} orientation="vertical" />
      </div>
    </Page>
  );
};
