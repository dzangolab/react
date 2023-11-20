import { useTranslation } from "@dzangolab/react-i18n";
import { Tooltip } from "@dzangolab/react-ui";
import { useRef } from "react";

export const TooltipDemo = () => {
  const { t } = useTranslation("ui");
  const rightReference = useRef(null);
  const leftReference = useRef(null);
  const topReference = useRef(null);
  const bottomReference = useRef(null);

  return (
    <div className="tooltip-component">
      <Tooltip elementRef={rightReference} position="right" delay={100}>
        {t("tooltip.positions.right.message")}
      </Tooltip>
      <input
        ref={rightReference}
        placeholder={t("tooltip.positions.right.placeholder")}
      />
      <Tooltip elementRef={leftReference} position="left" delay={200}>
        {t("tooltip.positions.left.message")}
      </Tooltip>
      <input
        ref={leftReference}
        placeholder={t("tooltip.positions.left.placeholder")}
      />
      <Tooltip elementRef={topReference} position="top" delay={100}>
        {t("tooltip.positions.top.message")}
      </Tooltip>
      <input
        ref={topReference}
        placeholder={t("tooltip.positions.top.placeholder")}
      />
      <Tooltip elementRef={bottomReference} position="bottom" delay={200}>
        {t("tooltip.positions.bottom.message")}
      </Tooltip>
      <input
        ref={bottomReference}
        placeholder={t("tooltip.positions.bottom.placeholder")}
      />
    </div>
  );
};
