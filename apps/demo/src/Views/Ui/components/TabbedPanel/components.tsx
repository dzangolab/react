import { SubPane, TabbedPanel } from "@dzangolab/react-ui";

const TabbedPanelComponent = ({
  id,
  defaultActiveIndex,
  persistState,
  position,
  isString = false,
}: {
  id: string;
  defaultActiveIndex?: number;
  persistState?: boolean;
  position?: "top" | "bottom" | "left" | "right";
  isString?: boolean;
}): JSX.Element | string => {
  const tabbedPanelProperties = {
    id,
    defaultActiveIndex,
    persistState,
    position,
  };

  const content = (
    <TabbedPanel {...tabbedPanelProperties}>
      <SubPane title="Description">Description</SubPane>
      <SubPane title="Reviews">Reviews</SubPane>
      <SubPane title="Specifications">Specifications</SubPane>
      <SubPane title="Pricing">Pricing</SubPane>
    </TabbedPanel>
  );

  if (isString) {
    const propertiesString = [
      `id="${id}"`,
      defaultActiveIndex !== undefined
        ? `defaultActiveIndex={${defaultActiveIndex}}`
        : "",
      persistState === false ? "persistState={false}" : "",
      position ? `position="${position}"` : "",
    ]
      .filter(Boolean)
      .join(" ");

    return `<TabbedPanel ${propertiesString}>
  <SubPane title="Description">Description</SubPane>
  <SubPane title="Reviews">Reviews</SubPane>
  <SubPane title="Specifications">Specifications</SubPane>
  <SubPane title="Pricing">Pricing</SubPane>
</TabbedPanel>`;
  }

  return content;
};

const Basic = ({
  isString = false,
}: {
  isString?: boolean;
}): JSX.Element | string => (
  <TabbedPanelComponent id="tabbed-pannel-1" isString={isString} />
);

const CustomActive = ({
  isString = false,
}: {
  isString?: boolean;
}): JSX.Element | string => (
  <TabbedPanelComponent
    id="tabbed-pannel-2"
    defaultActiveIndex={1}
    isString={isString}
  />
);

const DisableStatePersistence = ({
  isString = false,
}: {
  isString?: boolean;
}): JSX.Element | string => (
  <TabbedPanelComponent
    id="tabbed-pannel-3"
    persistState={false}
    isString={isString}
  />
);

const PositionBottom = ({
  isString = false,
}: {
  isString?: boolean;
}): JSX.Element | string => (
  <TabbedPanelComponent
    id="tabbed-pannel-4"
    position="bottom"
    isString={isString}
  />
);

const PositionLeft = ({
  isString = false,
}: {
  isString?: boolean;
}): JSX.Element | string => (
  <TabbedPanelComponent
    id="tabbed-pannel-5"
    position="left"
    isString={isString}
  />
);

const PositionRight = ({
  isString = false,
}: {
  isString?: boolean;
}): JSX.Element | string => (
  <TabbedPanelComponent
    id="tabbed-pannel-6"
    position="right"
    isString={isString}
  />
);

export {
  Basic,
  CustomActive,
  DisableStatePersistence,
  PositionBottom,
  PositionLeft,
  PositionRight,
};
