import { useTranslation } from "@dzangolab/react-i18n";
import { Page } from "@dzangolab/react-ui";
import React from "react";

import Card from "../../components/Card";

interface IProperties {
  routes: {
    name: string;
    route: string;
  }[];
}
const Home: React.FC<IProperties> = ({ routes }) => {
  const { t } = useTranslation();

  return (
    <Page title={t("demo")}>
      {routes.map((route) => {
        return (
          <Card
            key={route.route}
            title={t(route.name)}
            onClick={() => (window.location.hash = route.route)}
          />
        );
      })}
    </Page>
  );
};

export default Home;
