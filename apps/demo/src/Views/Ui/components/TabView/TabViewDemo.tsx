import { useTranslation } from "@dzangolab/react-i18n";
import { Page, TabView, TDataTable } from "@dzangolab/react-ui";
import { Button } from "@dzangolab/react-ui";
import { useState } from "react";

import { addTab } from "./utils";
import { CodeBlock, Section } from "../../../../components/Demo";

const data = [
  {
    id: 1,
    prop: "tabs",
    type: "array",
    default: "-",
    description: "Array of tab object.",
  },
  {
    id: 2,
    prop: "visibleTabs",
    type: "array",
    default: "-",
    description: "Array of visible tab object.",
  },
  {
    id: 3,
    prop: "position",
    type: '"top" | "left" | "bottom" | "right"',
    default: "top",
    description: "Position of the tab panel header relative to its content.",
  },
  {
    id: 4,
    prop: "activeTab",
    type: "string",
    default: "-",
    description: "Active index of TabView.",
  },
  {
    id: 5,
    prop: "persistState",
    type: "boolean",
    default: "true",
    description:
      "If true, tab state is saved either in localStorage or sessionStorage.",
  },
  {
    id: 6,
    prop: "persistStateStorage",
    type: '"localStorage" | "sessionStorage"',
    default: "localStorage",
    description: "Storage to save tab state.",
  },
  {
    id: 7,
    prop: "onTabClose",
    type: "(key: string) => void",
    default: "-",
    description: "Function to be called when tab is closed.",
  },
  {
    id: 8,
    prop: "onTabChange",
    type: "(key: string) => void",
    default: "-",
    description: "Function to be called when tab is changed.",
  },
];

const tabs = [
  { label: "Description", children: "Description", key: "1" },
  { label: "Reviews", children: "Reviews", key: "2", closable: true },
  {
    label: "Specifications",
    children: "Specifications",
    key: "3",
    closable: true,
  },
  { label: "Pricing", children: "Pricing", key: "4", closable: true },
];

export const TabViewDemo = () => {
  const [t] = useTranslation("ui");
  const [visibleTabs, setVisibleTabs] = useState([{ key: "1" }]);
  const [active, setActive] = useState("1");

  const handleTabClose = (key: any) => {
    const newVisibleTabs = visibleTabs.filter((tab: any) => tab.key !== key);

    setVisibleTabs(newVisibleTabs);
  };

  const handleTabChange = (key: string) => {
    setActive(key);
  };

  return (
    <Page title={t("tabview.title")} className="tab-view">
      <Section title={t("headers.usage")}>
        <p>{t("common.usage", { component: "Tabview" })}</p>
        <CodeBlock exampleCode="import { Tabview } from 'dzangolab/react-ui';" />
      </Section>
      <Section title={t("tabview.usage.basic")}>
        <div className="tab-button-group">
          <Button
            label="Add specifications tab"
            onClick={() => addTab("3", visibleTabs, setVisibleTabs, setActive)}
          />
          <Button
            label="Add reviews tab"
            onClick={() => addTab("2", visibleTabs, setVisibleTabs, setActive)}
          />
          <Button
            label="Add pricing tab"
            onClick={() => addTab("4", visibleTabs, setVisibleTabs, setActive)}
          />
        </div>
        <TabView
          visibleTabs={visibleTabs}
          tabs={tabs}
          onTabClose={handleTabClose}
          onTabChange={handleTabChange}
          activeTab={active}
          id="tabview-1"
        />
        <CodeBlock
          exampleCode='
const tabs = [
 { label: "Description", children: "Description", key: "1" },
 { label: "Reviews", children: "Reviews", key: "2", closable: true },
 { label: "Specifications", children: "Specifications", key: "3", closable: true },
 { label: "Pricing", children: "Pricing", key: "4", closable: true },
];

export const addTab = (
  key: string,
  visibleTabs: any[],
  setVisibleTabs: any,
  setActive: any,
) => {
  const newTab = { key };
  const existingTab = visibleTabs.find((tab) => tab.key === key);

  if (existingTab) {
    setActive(existingTab.key);
  } else {
    setVisibleTabs([...visibleTabs, newTab]);
    setActive(newTab.key);
  }
};
          
const [visibleTabs, setVisibleTabs] = useState([{ key: "1" }]);
const [active, setActive] = useState("1");

const handleTabClose = (key: any) => {
  const newVisibleTabs = visibleTabs.filter((tab: any) => tab.key !== key);

  setVisibleTabs(newVisibleTabs);
};

const handleTabChange = (key: string) => {
  setActive(key);
};

<div className="tab-button-group">
  <Button
  label="Add specifications tab"
  onClick={() => addTab("3", visibleTabs, setVisibleTabs, setActive)}
  />
  <Button 
  label="Add reviews tab" 
  onClick={() => addTab("2", visibleTabs, setVisibleTabs, setActive)}
  />
  <Button 
  label="Add pricing tab" 
  onClick={() => addTab("4", visibleTabs, setVisibleTabs, setActive)}
  />
</div>
<TabView
  visibleTabs={visibleTabs}
  tabs={tabs}
  activeTab={active}
  onTabClose={handleTabClose}
  id="tabview-1"
  onTabChange={handleTabChange}
/>'
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
              accessorKey: "default",
              header: "Default",
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
