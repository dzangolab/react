import { SubmitButton as Button } from "@dzangolab/react-ui";
import { ToolTip } from "@dzangolab/react-ui";

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
