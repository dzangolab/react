import { useTranslation } from "@dzangolab/react-i18n";
import { Page, TabView, TDataTable } from "@dzangolab/react-ui";
import { useState } from "react";

import { CodeBlock, Section } from "../../../components/Demo";

const data = [
  {
    id: 1,
    prop: "tabs",
    type: "array",
    description: "Predefined array of tabs.",
  },
  {
    id: 2,
    prop: "visibleTabs",
    type: "array",
    description: "Array of visible tabs.",
  },
  {
    id: 3,
    prop: "position",
    type: "string",
    description: "Position of tab.",
  },
  {
    id: 4,
    prop: "onClose",
    type: "() => void",
    description: "Function to be called when tab is closed.",
  },
];

const tabs = [
  { label: "Tab 1", children: "Tab 1", key: "1", closable: true },
  { label: "Tab 2", children: "Tab 2", key: "2" },
  { label: "New Tab", children: "New Tab", key: "3", closable: true },
];

const _visibleTabs = [{ key: "1" }, { key: "2" }];

export const TabViewDemo = () => {
  const [t] = useTranslation("ui");
  const [visibleTabs, setVisibleTabs] = useState(_visibleTabs);
  const [active, setActive] = useState(0);

  const handleClick = () => {
    const newTab = { key: "3" };
    const existingTab = visibleTabs.find((tab) => tab.key === newTab.key);
    if (existingTab) {
      const activeIndex = visibleTabs.findIndex(
        (tab) => tab.key === newTab.key,
      );
      setActive(activeIndex);
    } else {
      setVisibleTabs([...visibleTabs, newTab]);
      setActive(visibleTabs.length);
    }
  };

  const handleTabClose = (key: any) => {
    setVisibleTabs((previousTabs) =>
      previousTabs.filter((tab) => tab.key !== key),
    );
  };

  return (
    <Page title={t("tabview.title")}>
      <Section title={t("headers.usage")}>
        <p>{t("common.usage", { component: "Tabview" })}</p>
        <CodeBlock exampleCode="import { Tabview } from 'dzangolab/react-ui';" />
      </Section>
      <Section>
        <div style={{ marginBottom: 16 }}>
          <button onClick={handleClick}>Add</button>
        </div>
        <TabView
          visibleTabs={visibleTabs}
          tabs={tabs}
          active={active}
          setActive={setActive}
          onClose={handleTabClose}
        />
        <CodeBlock
          exampleCode="<div style={{ marginBottom: 16 }}>
  <button onClick={handleClick}>Add</button>
</div>
<TabView
  visibleTabs={visibleTabs}
  tabs={tabs}
  active={active}
  setActive={setActive}
  onClose={handleTabClose}
/>"
        />
      </Section>

      <Section
        title={t("headers.propertiesValue", {
          value: "Properties",
        })}
      >
        <TDataTable
          columns={[
            {
              accessorKey: "prop",
              header: "Properties",
            },
            {
              accessorKey: "type",
              header: "Type",
            },
            {
              accessorKey: "description",
              header: "Description",
            },
          ]}
          data={data}
          paginated={false}
        />
      </Section>
    </Page>
  );
};
