import { useTranslation } from "@dzangolab/react-i18n";
import { TabbedPanel, Page, SubPane } from "@dzangolab/react-ui";

import { Section } from "../../../components/Demo";

export const TabbedPanelDemo = () => {
  const [t] = useTranslation("ui");

  return (
    <Page title={t("tabbedPanel.title")}>
      <Section title={t("tabbedPanel.usage.basic")}>
        <TabbedPanel>
          <SubPane title="Tab 1">Tab 1 content</SubPane>
          <SubPane title="Tab 2">Tab 2 content</SubPane>
          <SubPane title="Tab 3">Tab 3 content</SubPane>
        </TabbedPanel>
      </Section>
      <Section title={t("tabbedPanel.usage.customActiveTab")}>
        <TabbedPanel defaultActiveIndex={1}>
          <SubPane title="Tab 1">Tab 1 content</SubPane>
          <SubPane title="Tab 2">Tab 2 content</SubPane>
          <SubPane title="Tab 3">Tab 3 content</SubPane>
        </TabbedPanel>
      </Section>
    </Page>
  );
};
