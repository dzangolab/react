import { useTranslation } from "@dzangolab/react-i18n";
import { Page } from "@dzangolab/react-ui";
import { FC, useState } from "react";

import Card from "../Card";
import ComponentWrapper from "../ComponentWrapper";

import type { Component } from "../../types";

interface IProperties {
  componentList: Component[] | [];
  title: string;
  translationNameSpace?: string[];
}

const ComponentList: FC<IProperties> = ({
  componentList,
  title,
  translationNameSpace = [],
}) => {
  const [selectedComponentIndex, setSelectedComponentIndex] = useState<
    null | number
  >(null);

  const { t } = useTranslation([...translationNameSpace, "app"]);

  const renderComponent = () => {
    if (selectedComponentIndex === null) {
      return (
        <Page title={t(title, { ns: "app" })}>
          {componentList.map((component, index) => (
            <Card
              key={component.key}
              title={t(component.title)}
              onClick={() => setSelectedComponentIndex(index)}
            />
          ))}
        </Page>
      );
    } else {
      return (
        <ComponentWrapper
          onBack={() => setSelectedComponentIndex(null)}
          title={t(componentList[selectedComponentIndex].title)}
        >
          {componentList[selectedComponentIndex].component}
        </ComponentWrapper>
      );
    }
  };

  return renderComponent();
};

export default ComponentList;
