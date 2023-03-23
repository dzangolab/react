import { useTranslation } from "@dzangolab/react-i18n";
import { LoadingIcon, Page } from "@dzangolab/react-ui";
import { useState } from "react";
import Card from "../../components/Card";
import { UI_COMPONENTS, UI_COMPONENTS_MAPPING } from "../../constants";

import "./index.css";

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
      switch (selectedComponent.key) {
        case 1:
          return (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <button
                  className="btn-back"
                  onClick={() => setSelectedComponent(null)}
                >
                  &lt;-
                </button>
                <h2>{selectedComponent.value}</h2>
              </div>
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
            </div>
          );
        default:
          return null;
      }
    }
  };

  return render();
};

export default Ui;
