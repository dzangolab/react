import { useTranslation } from "@dzangolab/react-i18n";
import { Outlet } from "react-router-dom";

import { Demo } from "../../components/Demo";

export const LAYOUT_ROUTES = {
  GET_STARTED: "/layout",
};

export const routes = [];

export const Pages = () => {
  const [t] = useTranslation("layout");

  const subnav = [
    { route: "/layout", label: t("app:getStarted") },
    ...routes.map(({ path, key }) => {
      return { route: path, label: t(key) };
    }),
  ];

  return (
    <Demo subnav={subnav}>
      <Outlet />
    </Demo>
  );
};
