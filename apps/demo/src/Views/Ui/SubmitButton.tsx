import { SubmitButton as Button, ToolTip } from "@dzangolab/react-ui";

export const SubmitButton = () => {
  return (
    <>
      <ToolTip
        message="Submit the data"
        position={{ top: -70, left: 200 }}
        className="submit-button-tooltip"
      >
        <Button label="Submit" />
      </ToolTip>
      <Button label="Submit loading" loading />
    </>
  );
};
