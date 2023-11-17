import { Tooltip } from "@dzangolab/react-ui";
import { useRef } from "react";

export const TooltipDemo = () => {
  const submitButtonReference = useRef<HTMLButtonElement>(null);
  const cancelButtonReference = useRef<HTMLButtonElement>(null);
  const buttonReference = useRef<HTMLButtonElement>(null);
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
      <Tooltip
        elementRef={cancelButtonReference}
        position="bottom"
        offset={5}
        delay={100}
      >
        <span>cancel button</span>
      </Tooltip>
      <button ref={cancelButtonReference}>Cancel</button>
      <Tooltip
        elementRef={buttonReference}
        position="left"
        offset={5}
        delay={200}
      >
        <span>This is just button</span>
      </Tooltip>
      <button ref={buttonReference}>button</button>
    </>
  );
};
