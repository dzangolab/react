import { Tooltip } from "@dzangolab/react-ui";
import { useRef } from "react";

export const TooltipDemo = () => {
  const submitButtonReference = useRef<HTMLButtonElement>(null);
  return (
    <>
      <Tooltip
        elementRef={submitButtonReference}
        position="top"
        offset={10}
        delay={200}
      >
        submit button
      </Tooltip>
      <button ref={submitButtonReference}>Submit</button>
    </>
  );
};
