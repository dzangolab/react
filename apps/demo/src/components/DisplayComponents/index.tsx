import { Page } from "@dzangolab/react-ui";
import { FC, useState } from "react";

import Card from "../Card";
import ComponentWrapper from "../ComponentWrapper";
import { Component } from "../../types";

interface IProperties {
  componentList: Component[];
  title: string;
}

const DisplayComponents: FC<IProperties> = ({ componentList, title }) => {
  const [selectedComponentIndex, setSelectedComponentIndex] = useState<
    null | number
  >(null);

  const renderComponent = () => {
    if (selectedComponentIndex === null) {
      return componentList.map((component, index) => (
        <Card
          key={component.key}
          title={component.title}
          onClick={() => setSelectedComponentIndex(index)}
        />
      ));
    } else {
      return (
        <ComponentWrapper
          onBack={() => setSelectedComponentIndex(null)}
          title={componentList[selectedComponentIndex].title}
        >
          {componentList[selectedComponentIndex].component}
        </ComponentWrapper>
      );
    }
  };

  return <Page title={title}>{renderComponent()}</Page>;
};

export default DisplayComponents;
