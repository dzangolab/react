import { Tooltip } from "@dzangolab/react-ui";
import { useRef } from "react";

export const TooltipDemo = () => {
  const submitButtonReference = useRef<HTMLButtonElement>(null);
  const cancelButtonReference = useRef<HTMLButtonElement>(null);
  const buttonReference = useRef<HTMLButtonElement>(null);
  const reference = useRef<HTMLButtonElement>(null);
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
        <span>Tooltip is displayed on left</span>
      </Tooltip>
      <button ref={buttonReference}>button</button>
      <Tooltip elementRef={reference} position="right" offset={5}>
        <span>Tooltip is displayed on right</span>
      </Tooltip>
      <button ref={reference}>right</button>
    </>
  );
};
