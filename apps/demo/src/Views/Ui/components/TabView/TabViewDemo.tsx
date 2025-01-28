import { useTranslation } from "@dzangolab/react-i18n";
import { Page, TabView, TDataTable } from "@dzangolab/react-ui";
import { Button } from "@dzangolab/react-ui";
import { useEffect, useState } from "react";

import { addTab } from "./utils";
import { CodeBlock, Section } from "../../../../components/Demo";

const data = [
  {
    id: 1,
    prop: "tabs",
    type: "array",
    default: "null",
    description: "Predefined array of tabs.",
  },
  {
    id: 2,
    prop: "visibleTabs",
    type: "array",
    default: "null",
    description: "Array of visible tabs.",
  },
  {
    id: 3,
    prop: "position",
    type: "string",
    default: "top",
    description: "Position of the tab panel header relative to its content.",
  },
  {
    id: 4,
    prop: "onTab'Close",
    type: "() => void",
    default: "null",
    description: "Function to be called when tab is closed.",
  },
  {
    id: 5,
    prop: "activeTab",
    type: "string",
    default: "1",
    description: "Active index of TabView.",
  },
  {
    id: 6,
    prop: "setActiveTab",
    type: "() => void",
    default: "null",
    description: "Function to be called when tab state is changed.",
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

const _visibleTabs = [{ key: "1" }];

export const TabViewDemo = () => {
  const [t] = useTranslation("ui");
  const tabId = "tabview-1";
  const [visibleTabs, setVisibleTabs] = useState(() => {
    const savedTabs = localStorage.getItem(tabId);
    return savedTabs ? JSON.parse(savedTabs).visibleTabs : _visibleTabs;
  });
  const [active, setActive] = useState(() => {
    const savedActiveTab = localStorage.getItem(tabId);
    return savedActiveTab !== null ? JSON.parse(savedActiveTab).activeTab : "1";
  });

  useEffect(() => {
    localStorage.setItem(
      tabId,
      JSON.stringify({
        activeTab: active,
        visibleTabs: visibleTabs,
      }),
    );
  }, [visibleTabs, active]);

  const handleTabClose = (key: any) => {
    const tabIndex = visibleTabs.findIndex((tab: any) => tab.key === key);
    const newVisibleTabs = visibleTabs.filter((tab: any) => tab.key !== key);
    let newActiveTab = "";

    if (tabIndex > 0) {
      newActiveTab = newVisibleTabs[tabIndex - 1]?.key;
    } else {
      newActiveTab = newVisibleTabs[0].key;
    }
    setActive(newActiveTab);

    setVisibleTabs(newVisibleTabs);
  };

  return (
    <Page title={t("tabview.title")}>
      <Section title={t("headers.usage")}>
        <p>{t("common.usage", { component: "Tabview" })}</p>
        <CodeBlock exampleCode="import { Tabview } from 'dzangolab/react-ui';" />
      </Section>
      <Section title={t("tabview.usage.basic")}>
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
        <TabView
          visibleTabs={visibleTabs}
          tabs={tabs}
          onTabClose={handleTabClose}
          activeTab={active}
          setActiveTab={setActive}
        />
        <CodeBlock
          exampleCode='
const tabs = [
 { label: "Description", children: "Description", key: "1" },
 { label: "Reviews", children: "Reviews", key: "2", closable: true },
 { label: "Specifications", children: "Specifications", key: "3", closable: true },
 { label: "Pricing", children: "Pricing", key: "4", closable: true },
];
          
const _visibleTabs = [{ key: "1" }];

const tabId = "tabview-1";

const [visibleTabs, setVisibleTabs] = useState(() => {
  const savedTabs = localStorage.getItem(tabId);
  return savedTabs ? JSON.parse(savedTabs).visibleTabs : _visibleTabs;
});

const [active, setActive] = useState(() => {
  const savedActiveTab = localStorage.getItem(tabId);
  return savedActiveTab !== null ? JSON.parse(savedActiveTab).activeTab : "1";
});

const handleTabClose = (key: any) => {
  const tabIndex = visibleTabs.findIndex((tab: any) => tab.key === key);
  const newVisibleTabs = visibleTabs.filter((tab: any) => tab.key !== key);
  let newActiveTab = "";

  if(tabIndex > 0) {
    newActiveTab = newVisibleTabs[tabIndex -1]?.key
  }else {
    newActiveTab = newVisibleTabs[0].key
  }
  setActive(newActiveTab);

  setVisibleTabs(newVisibleTabs);
};

useEffect(() => {
  localStorage.setItem(
    tabId,
    JSON.stringify({
      activeTab: active,
      visibleTabs: visibleTabs,
    }),
  );
}, [visibleTabs, active]);

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
<TabView
  visibleTabs={visibleTabs}
  tabs={tabs}
  activeTab={active}
  setActiveTab={setActive}
  onTabClose={handleTabClose}
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
