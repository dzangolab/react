import { useTranslation } from "@dzangolab/react-i18n";
import { Tooltip } from "@dzangolab/react-ui";
import { useRef } from "react";

export const TooltipDemo = () => {
  const { t } = useTranslation("ui");
  const rightReference = useRef(null);
  const leftReference = useRef(null);
  const topReference = useRef(null);
  const bottomReference = useRef(null);
  const htmlReference = useRef(null);

  return (
    <div className="tooltip-component">
      <Tooltip
        elementRef={rightReference}
        position="right"
        offset={10}
        delay={100}
      >
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
      <Tooltip elementRef={topReference} position="top" offset={10} delay={500}>
        {t("tooltip.positions.top.message")}
      </Tooltip>
      <input
        ref={topReference}
        placeholder={t("tooltip.positions.top.placeholder")}
      />
      <Tooltip elementRef={bottomReference} position="bottom">
        <h3>{t("tooltip.positions.bottom.placeholder")}</h3>
        <h4>{t("tooltip.positions.bottom.message")}</h4>
      </Tooltip>
      <input
        ref={bottomReference}
        placeholder={t("tooltip.positions.bottom.placeholder")}
      />
      <div className="button-tooltip">
        <Tooltip elementRef={htmlReference} position="right" offset={10}>
          <i className="pi pi-check"></i>
          <span>{t("tooltip.button.message")}</span>
        </Tooltip>
        <button ref={htmlReference}>{t("tooltip.button.save")}</button>
      </div>
    </div>
  );
};
