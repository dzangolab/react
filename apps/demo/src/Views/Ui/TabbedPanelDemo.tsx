import { useTranslation } from "@dzangolab/react-i18n";
import { TabbedPanel } from "@dzangolab/react-ui";

export const TabbedPanelDemo = () => {
  const { t } = useTranslation("ui");
  return (
    <>
      <TabbedPanel>
        <div title={t("tabbedPanel.label.itemOne")}>
          {t("tabbedPanel.label.itemOne")}
        </div>
        <div title={t("tabbedPanel.label.itemTwo")}>
          {t("tabbedPanel.label.itemTwo")}
        </div>
      </TabbedPanel>
    </>
  );
};
