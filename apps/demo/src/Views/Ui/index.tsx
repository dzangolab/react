import { useTranslation } from "@dzangolab/react-i18n";
import { LoadingIcon, Page, ResponsiveMenu } from "@dzangolab/react-ui";
import { useState } from "react";

import { SubmitButton } from "./SubmitButton";
import Card from "../../components/Card";
import PageWrapper from "../../components/PageWrapper";
import {
  MENU_ROUTES,
  UI_COMPONENTS,
  UI_COMPONENTS_MAPPING,
} from "../../constants";

const Ui = () => {
  const { t } = useTranslation();
  const [selectedComponent, setSelectedComponent] = useState<null | {
    key: UI_COMPONENTS_MAPPING;
    value: string;
  }>(null);

  const render = () => {
    if (selectedComponent === null) {
      return (
        <Page title={t("header.menu.ui")}>
          {UI_COMPONENTS.map((component) => (
            <Card
              key={component.key}
              title={component.value}
              onClick={() => setSelectedComponent(component)}
            />
          ))}
        </Page>
      );
    } else {
      let component = null;

      switch (selectedComponent.key) {
        case 1:
          component = (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
              }}
            >
              <LoadingIcon color={"black"} fontSize={"0.5rem"} />
            </div>
          );
          break;
        case 2:
          component = <SubmitButton />;
          break;
        case 3:
          component = (
            <>
              <Page title="Horizontal menu">
                <ResponsiveMenu routes={MENU_ROUTES} />
              </Page>
              <Page title="Vertical menu">
                <ResponsiveMenu routes={MENU_ROUTES} horizontal />
              </Page>
            </>
          );
          break;
        default:
          return null;
      }

      return (
        <PageWrapper
          onBack={() => setSelectedComponent(null)}
          title={selectedComponent.value}
        >
          {component}
        </PageWrapper>
      );
    }
  };

  return render();
};

export default Ui;
