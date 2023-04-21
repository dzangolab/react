import { useTranslation } from "@dzangolab/react-i18n";
import { Page } from "@dzangolab/react-ui";
import { Login } from "@dzangolab/react-user";
import { useState } from "react";

import Card from "../../components/Card";
import PageWrapper from "../../components/PageWrapper";

const ROUTES = [
  {
    key: 1,
    title: "Login Page",
    component: <Login orientation="horizontal" />,
  },
];

const User = () => {
  const { t } = useTranslation();
  const [selectedComponentIndex, setSelectedComponentIndex] = useState<
    null | number
  >(null);

  const renderComponent = () => {
    if (selectedComponentIndex === null) {
      return ROUTES.map((component, index) => (
        <Card
          key={component.key}
          title={component.title}
          onClick={() => setSelectedComponentIndex(index)}
        />
      ));
    } else {
      return (
        <PageWrapper
          onBack={() => setSelectedComponentIndex(null)}
          title={ROUTES[selectedComponentIndex].title}
        >
          {ROUTES[selectedComponentIndex].component}
        </PageWrapper>
      );
    }
  };

  return <Page title={t("header.menu.user")}>{renderComponent()}</Page>;
};

export default User;
