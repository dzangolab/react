import { useTranslation } from "@dzangolab/react-i18n";
import { TabbedPanel, Page, SubPane } from "@dzangolab/react-ui";

import { Section } from "../../../components/Demo";

export const TabbedPanelDemo = () => {
  const [t] = useTranslation("ui");

  return (
    <Page title={t("tabbedPanel.title")}>
      <Section title={t("tabbedPanel.usage.basic")}>
        <TabbedPanel id="tabbed-pannel-1">
          <SubPane title="Tab 1">Tab 1 content</SubPane>
          <SubPane title="Tab 2">Tab 2 content</SubPane>
          <SubPane title="Tab 3">Tab 3 content</SubPane>
        </TabbedPanel>
      </Section>
      <Section title={t("tabbedPanel.usage.customActiveTab")}>
        <TabbedPanel id="tabbed-pannel-2" defaultActiveIndex={1}>
          <SubPane title="Tab 1">Tab 1 content</SubPane>
          <SubPane title="Tab 2">Tab 2 content</SubPane>
          <SubPane title="Tab 3">Tab 3 content</SubPane>
        </TabbedPanel>
      </Section>
      <Section title={t("tabbedPanel.usage.disableTabState")}>
        <TabbedPanel id="tabbed-pannel-3" disablePersistState>
          <SubPane title="Tab 1">Tab 1 content</SubPane>
          <SubPane title="Tab 2">Tab 2 content</SubPane>
          <SubPane title="Tab 3">Tab 3 content</SubPane>
        </TabbedPanel>
      </Section>
      <Section title={t("tabbedPanel.usage.positionBottom")}>
        <TabbedPanel id="tabbed-pannel-4" position="bottom">
          <SubPane title="Tab 1">Tab 1 content</SubPane>
          <SubPane title="Tab 2">Tab 2 content</SubPane>
          <SubPane title="Tab 3">Tab 3 content</SubPane>
        </TabbedPanel>
      </Section>
      <Section title={t("tabbedPanel.usage.positionLeft")}>
        <TabbedPanel id="tabbed-pannel-5" position="left">
          <SubPane title="Tab 1">Tab 1 content</SubPane>
          <SubPane title="Tab 2">Tab 2 content</SubPane>
          <SubPane title="Tab 3">Tab 3 content</SubPane>
        </TabbedPanel>
      </Section>
      <Section title={t("tabbedPanel.usage.positionRight")}>
        <TabbedPanel id="tabbed-pannel-5" position="right">
          <SubPane title="Tab 1">Tab 1 content</SubPane>
          <SubPane title="Tab 2">Tab 2 content</SubPane>
          <SubPane title="Tab 3">Tab 3 content</SubPane>
        </TabbedPanel>
      </Section>
    </Page>
  );
};
