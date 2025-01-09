import { Button, SubPane, TabbedPanel } from "@dzangolab/react-ui";

const Basic = ({
  isString = false,
}: {
  isString?: boolean;
}): JSX.Element | string => {
  if (isString) {
    return `<TabbedPanel id="tabbed-pannel-1">
  <SubPane title="Description">Description</SubPane>
  <SubPane title="Reviews">Reviews</SubPane>
  <SubPane title="Specifications">Specifications</SubPane>
  <SubPane title="Pricing">Pricing</SubPane>
</TabbedPanel>`;
  }

  return (
    <TabbedPanel id="tabbed-pannel-1">
      <SubPane title="Description">Description</SubPane>
      <SubPane title="Reviews">Reviews</SubPane>
      <SubPane title="Specifications">Specifications</SubPane>
      <SubPane title="Pricing">Pricing</SubPane>
    </TabbedPanel>
  );
};

export { Basic };
