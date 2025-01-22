import { useTranslation } from "@dzangolab/react-i18n";
import { TabbedPanel, Page, SubPane } from "@dzangolab/react-ui";
import { useState } from "react";

import {
  Basic,
  CustomActive,
  DisableStatePersistence,
  PositionBottom,
  PositionLeft,
  PositionRight,
} from "./components";
import { CodeBlock } from "../../../../components/Demo";
import { Section } from "../../../../components/Demo";

export const TabbedPanelDemo = () => {
  const [t] = useTranslation("ui");
  const [active, setActive] = useState(0);
  const initialItems = [
    { label: "Tab 1", children: "Content of Tab 1", key: "1" },
    { label: "Tab 2", children: "content of Tab 2", key: "2" },
  ];

  const [items, setItems] = useState(initialItems);

  const handleClick = () => {
    const newTab = { label: "New Tab", children: "New Tab Pane", key: "3" };

    const existingTabIndex = items.findIndex(
      (item) => item.key === newTab.key || item.label === newTab.label,
    );
    if (existingTabIndex !== -1) {
      setActive(existingTabIndex);
    } else {
      setItems([...items, newTab]);
    }
  };

  return (
    <Page title={t("tabbedPanel.title")}>
      <Section title={t("tabbedPanel.usage.addTab")}>
        <div style={{ marginBottom: 16 }}>
          <button onClick={handleClick}>Add</button>
        </div>
        <TabbedPanel tabs={items} defaultActiveIndex={active}></TabbedPanel>
      </Section>
    </Page>
  );
};
