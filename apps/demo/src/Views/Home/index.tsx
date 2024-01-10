import { useTranslation } from "@dzangolab/react-i18n";
import { Page } from "@dzangolab/react-ui";
import React from "react";

import { Package } from "./components/Package";

const Home: React.FC = () => {
  const { t } = useTranslation();

  const packages = [
    {
      name: "ui",
      route: "/ui",
      description: "@dzangolab/react-ui components and utilities",
    },
    {
      name: "user",
      route: "/user",
      description: "@dzangolab/react-user components and utilities",
    },
    {
      name: "form",
      route: "/form",
      description: "@dzangolab/react-form components and utilities",
    },

    {
      name: "layout",
      route: "/layout",
      description: "@dzangolab/react-layout components and utilities",
    },
    {
      name: "i18n",
      route: "/i18n",
      description: "@dzangolab/react-i18n components and utilities",
    },
  ];

  return (
    <Page title={t("pages.home.title")} className="home">
      <div className="packages">
        {packages.map((package_) => {
          return (
            <Package
              key={package_.route}
              title={t(package_.name)}
              description={package_.description}
              onClick={() => (window.location.hash = package_.route)}
            />
          );
        })}
      </div>
    </Page>
  );
};

export default Home;
