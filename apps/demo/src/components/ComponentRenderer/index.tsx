import { FC, useState } from "react";
import Card from "../Card";
import PageWrapper from "../PageWrapper";
import { Page } from "@dzangolab/react-ui";
import { ComponentRoute } from "../../types";

interface IProperties {
  componentRoutes: ComponentRoute[];
  title: string;
}

const ComponentRenderer: FC<IProperties> = ({ componentRoutes, title }) => {
  const [selectedComponentIndex, setSelectedComponentIndex] = useState<
    null | number
  >(null);

  const renderComponent = () => {
    if (selectedComponentIndex === null) {
      return componentRoutes.map((component, index) => (
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
          title={componentRoutes[selectedComponentIndex].title}
        >
          {componentRoutes[selectedComponentIndex].component}
        </PageWrapper>
      );
    }
  };

  return <Page title={title}>{renderComponent()}</Page>;
};

export default ComponentRenderer;
