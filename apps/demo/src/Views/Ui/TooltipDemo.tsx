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
      >
        {t("tooltip.content")}
      </Tooltip>
      <input ref={rightReference} placeholder={t("tooltip.positions.right")} />
      <Tooltip elementRef={leftReference} position="left" delay={200}>
        {t("tooltip.content")}
      </Tooltip>
      <input ref={leftReference} placeholder={t("tooltip.positions.left")} />
      <Tooltip elementRef={topReference} position="top" offset={10} delay={500}>
        {t("tooltip.content")}
      </Tooltip>
      <input ref={topReference} placeholder={t("tooltip.positions.top")} />
      <Tooltip elementRef={bottomReference} position="bottom">
        <h3>{t("tooltip.positions.bottom")}</h3>
        <h4>{t("tooltip.content")}</h4>
      </Tooltip>
      <input
        ref={bottomReference}
        placeholder={t("tooltip.positions.bottom")}
      />
      <div className="button-save">
        <Tooltip elementRef={buttonReference} position="right" offset={10}>
          <i className="pi pi-check"></i>
          <span>{t("tooltip.button.content")}</span>
        </Tooltip>
        <button ref={buttonReference}>{t("tooltip.button.save")}</button>
      </div>
    </div>
  );
};
