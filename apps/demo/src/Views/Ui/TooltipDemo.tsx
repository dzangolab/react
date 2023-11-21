import { useTranslation } from "@dzangolab/react-i18n";
import { Tooltip } from "@dzangolab/react-ui";
import { useRef } from "react";

export const TooltipDemo = () => {
  const { t } = useTranslation("ui");
  const rightReference = useRef(null);
  const leftReference = useRef(null);
  const topReference = useRef(null);
  const bottomReference = useRef(null);
  const buttonReference = useRef(null);

  return (
    <div className="tooltip-component">
      <Tooltip
        elementRef={rightReference}
        position="right"
        offset={10}
        delay={100}
        mouseTrack
      >
        {t("tooltip.content")}
      </Tooltip>
      <div ref={rightReference}>{t("tooltip.positions.right")}</div>
      <Tooltip elementRef={leftReference} position="left" delay={200}>
        {t("tooltip.content")}
      </Tooltip>
      <div ref={leftReference}>{t("tooltip.positions.left")}</div>
      <Tooltip elementRef={topReference} position="top" offset={10} delay={500}>
        {t("tooltip.content")}
      </Tooltip>
      <div ref={topReference}>{t("tooltip.positions.top")}</div>
      <Tooltip elementRef={bottomReference} position="bottom" mouseTrack>
        <h3>{t("tooltip.positions.bottom")}</h3>
        <h4>{t("tooltip.content")}</h4>
      </Tooltip>
      <div ref={bottomReference}>{t("tooltip.positions.bottom")}</div>
      <Tooltip elementRef={buttonReference} position="right" offset={10}>
        <i className="pi pi-check"></i>
        <span>{t("tooltip.button.content")}</span>
      </Tooltip>
      <button ref={buttonReference} className="button-save">
        {t("tooltip.button.save")}
      </button>
    </div>
  );
};
