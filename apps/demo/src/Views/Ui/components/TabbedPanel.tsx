import { useTranslation } from "@dzangolab/react-i18n";
import { TabbedPanel, Page, SubPane } from "@dzangolab/react-ui";

export const TabbedPanelDemo = () => {
  const [t] = useTranslation("ui");

  return (
    <Page title={t("tabbedPanel.title")}>
      <h3>{t("tabbedPanel.usage.basic")}</h3>
      <TabbedPanel>
        <SubPane title="Tab 1">Tab 1 content</SubPane>
        <SubPane title="Tab 2">Tab 2 content</SubPane>
        <SubPane title="Tab 3">Tab 3 content</SubPane>
      </TabbedPanel>
      <br />
      <h3>{t("tabbedPanel.usage.customActiveTab")}</h3>
      <TabbedPanel defaultActiveIndex={1}>
        <SubPane title="Tab 1">Tab 1 content</SubPane>
        <SubPane title="Tab 2">Tab 2 content</SubPane>
        <SubPane title="Tab 3">Tab 3 content</SubPane>
      </TabbedPanel>
    </Page>
  );
};
