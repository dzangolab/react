import { ConfirmPasswordForm, LoginForm } from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";
import { Page } from "@dzangolab/react-ui";
import { useState } from "react";
import Card from "../../components/Card";
import PageWrapper from "../../components/PageWrapper";

const ROUTES = [
  {
    key: 1,
    title: "Login Form",
    component: <LoginForm />,
  },
  {
    key: 2,
    title: "Confirm Password Form",
    component: <ConfirmPasswordForm />,
  },
];

const Form = () => {
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

  return <Page title={t("header.menu.form")}>{renderComponent()}</Page>;
};

export default Form;
