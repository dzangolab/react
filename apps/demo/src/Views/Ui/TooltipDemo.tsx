import { useTranslation } from "@dzangolab/react-i18n";
import { Tooltip } from "@dzangolab/react-ui";
import { useRef } from "react";

export const TooltipDemo = () => {
  const { t } = useTranslation("ui");
  const submitButtonReference = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Tooltip
        elementRef={submitButtonReference}
        position="bottom"
        offset={10}
        delay={200}
      >
        {t("tooltip.submitButtonMessage")}
      </Tooltip>
      <button ref={submitButtonReference}>Submit</button>
    </>
  );
};
