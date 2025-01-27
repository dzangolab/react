import { useTranslation } from "@dzangolab/react-i18n";
import { Page, TabView, TDataTable } from "@dzangolab/react-ui";
import { Button } from "@dzangolab/react-ui";
import { useEffect, useState } from "react";

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
  const [visibleTabs, setVisibleTabs] = useState<
    | {
        key: string;
      }[]
    | []
  >(() => {
    const savedTabs = localStorage.getItem("visible-tabs");
    return savedTabs ? JSON.parse(savedTabs) : _visibleTabs;
  });
  const [active, setActive] = useState<number | undefined>();

  useEffect(() => {
    if (visibleTabs.length > 0) {
      localStorage.setItem("visible-tabs", JSON.stringify(visibleTabs));
    }
  }, [visibleTabs]);

  const handleClick = () => {
    const newTab = { key: "3" };
    const existingTab = visibleTabs.find((tab) => tab.key === newTab.key);
    if (existingTab) {
      setActive(Number(existingTab.key));
    } else {
      setVisibleTabs([...visibleTabs, newTab]);
      setActive(Number(newTab.key));
    }
  };

  const handleTabClose = (key: any) => {
    const newVisibleTabs = visibleTabs.filter((tab) => tab.key !== key);
    setVisibleTabs(newVisibleTabs);
    localStorage.setItem("visible-tabs", JSON.stringify(newVisibleTabs));
  };

  const handleTabChange = (key: string) => {
    setActive(Number(key));
  };

  return (
    <Page title={t("tabview.title")}>
      <Section title={t("headers.usage")}>
        <p>{t("common.usage", { component: "Tabview" })}</p>
        <CodeBlock exampleCode="import { Tabview } from 'dzangolab/react-ui';" />
      </Section>
      <Section>
        <Button label="Add" onClick={handleClick} style={{ width: "100px" }} />
        <TabView
          visibleTabs={visibleTabs}
          tabs={tabs}
          activeTabIndex={active}
          onClose={handleTabClose}
          onTabChange={handleTabChange}
          id="demo"
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
