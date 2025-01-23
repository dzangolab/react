import { useTranslation } from "@dzangolab/react-i18n";
import { Page, Tabview, TDataTable } from "@dzangolab/react-ui";
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
    prop: "activeTabIndex",
    type: "number",
    description: "Index of active tab.",
  },
  {
    id: 4,
    prop: "onClose",
    type: "function",
    description: "To close the tabs.",
  },
];

const tabs = [
  { label: "Tab 1", children: "Tab 1", key: "1", closable: true },
  { label: "Tab 2", children: "Tab 2", key: "2" },
  { label: "New Tab", children: "New Tab", key: "3", closable: true },
];

const _visibleTabs = [{ key: "1" }];

export const TabviewDemo = () => {
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
      setVisibleTabs((previousTabs) => {
        const updatedTabs = [...previousTabs, newTab];
        setActive(updatedTabs.length - 1);
        return updatedTabs;
      });
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
        <Tabview
          visibleTabs={visibleTabs}
          tabs={tabs}
          onClose={handleTabClose}
          activeTabIndex={active}
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
