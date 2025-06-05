import { useTranslation } from "@dzangolab/react-i18n";
import { Page, TabView, TDataTable } from "@dzangolab/react-ui";
import { Button } from "@dzangolab/react-ui";
import { ConfirmationModal } from "@dzangolab/react-ui";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { addTab } from "./utils";
import { CodeBlock, Section } from "../../../../components/Demo";

const data = [
  {
    id: 1,
    prop: "activeKey",
    type: "string",
    default: "-",
    description: "Active key of TabView.",
  },
  {
    id: 2,
    prop: "id",
    type: "string",
    default: "-",
    description:
      "Id of tab to save the state. Should provide 'id' in case of tab state persistence.",
  },
  {
    id: 3,
    prop: "lazy",
    type: "boolean",
    default: "true",
    description:
      "The lazy prop enables lazy loading.It only loads content for the active tab.",
  },
  {
    id: 4,
    prop: "persistState",
    type: "boolean",
    default: "true",
    description:
      "If true, tab state is saved either in localStorage or sessionStorage.",
  },
  {
    id: 5,
    prop: "persistStateStorage",
    type: '"localStorage" | "sessionStorage"',
    default: "localStorage",
    description: "Storage to save tab state.",
  },
  {
    id: 6,
    prop: "position",
    type: '"top" | "left" | "bottom" | "right"',
    default: "top",
    description: "Position of the tab panel header relative to its content.",
  },
  {
    id: 7,
    prop: "tabs",
    type: "array",
    default: "-",
    description: "Array of tab object.",
  },
  {
    id: 8,
    prop: "visibleTabs",
    type: "array",
    default: "-",
    description: "Array of visible tabs.",
  },
  {
    id: 9,
    prop: "onActiveTabChange",
    type: "(activeTab: string) => void",
    default: "-",
    description: "Function to be called when active tab change.",
  },
  {
    id: 10,
    prop: "onVisibleTabsChange",
    type: "(visibleTabs: string[]) => void",
    default: "-",
    description: "Function to be called when visible tabs change.",
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
  { label: "Installation", children: "Installation Instructions", key: "5" },
  { label: "Certifications", children: "Certifications", key: "6" },
];

export const TabViewDemo = () => {
  const [t] = useTranslation("ui");
  const navigate = useNavigate();

  const [visibleTabs, setVisibleTabs] = useState(["1"]);
  const [active, setActive] = useState("1");
  const [controlledVisibleTabs, setControlledVisibleTabs] = useState([
    "1",
    "2",
    "4",
  ]);
  const [controlledActiveTab, setControlledActiveTab] = useState("1");
  const [showModal, setShowModal] = useState(false);
  const [requestedTab, setRequestedTab] = useState<string | null>(null);

  const handleTabChange = (key: string) => {
    if (key !== controlledActiveTab) {
      setRequestedTab(key);
      setShowModal(true);
    }
  };

  const confirmTabSwitch = () => {
    if (requestedTab) {
      setControlledActiveTab(requestedTab);
      setRequestedTab(null);
    }
    setShowModal(false);
  };

  const cancelTabSwitch = () => {
    setRequestedTab(null);
    setShowModal(false);
  };

  const handleTabClose = (key: string) => {
    const tabIndex = controlledVisibleTabs.findIndex((tab) => tab === key);
    const newVisibleTabs = controlledVisibleTabs.filter((tab) => tab !== key);

    let newActiveTab = "";
    if (tabIndex > 0) {
      newActiveTab = newVisibleTabs[tabIndex - 1];
    } else {
      newActiveTab = newVisibleTabs[0];
    }

    setControlledActiveTab(newActiveTab);
    setControlledVisibleTabs(newVisibleTabs);
  };

  return (
    <Page
      title={t("tabview.title")}
      className="tab-view"
      toolbar={
        <Button
          label={t("buttons.back")}
          variant="textOnly"
          iconLeft={<i className="pi pi-chevron-left"></i>}
          onClick={() => navigate("..")}
        />
      }
    >
      <Section title={t("headers.usage")}>
        <p>{t("common.usage", { component: "TabView" })}</p>
        <CodeBlock exampleCode="import { TabView } from 'dzangolab/react-ui';" />
      </Section>

      <Section title={t("tabview.usage.basic")}>
        <TabView
          tabs={[
            { label: "Description", children: "Description", key: "1" },
            { label: "Reviews", children: "Reviews", key: "2" },
            {
              label: "Specifications",
              children: "Specifications",
              key: "3",
            },
            { label: "Pricing", children: "Pricing", key: "4" },
            {
              label: "Installation",
              children: "Installation Instructions",
              key: "5",
            },
            { label: "Certifications", children: "Certifications", key: "6" },
          ]}
          id="tabview-1"
        />
        <CodeBlock
          exampleCode='
<TabView
  tabs={[
    { label: "Description", children: "Description", key: "1" },
    { label: "Reviews", children: "Reviews", key: "2" },
    { label: "Specifications", children: "Specifications", key: "3" },
    { label: "Pricing", children: "Pricing", key: "4" },
    { label: "Installation", children: "Installation Instructions", key: "5" },
    { label: "Certifications", children: "Certifications", key: "6" },
  ]}
  id="tabview-1"
/>'
        />
      </Section>

      <Section title={t("tabview.usage.disableTabState.title")}>
        <p>{t("tabbedPanel.usage.disableTabState.subTitle")}</p>
        <TabView
          visibleTabs={["1", "5", "6"]}
          tabs={tabs}
          activeKey="1"
          id="tabview-2"
          persistState={false}
        />
        <CodeBlock
          exampleCode='
const tabs = [
 { label: "Description", children: "Description", key: "1" },
 { label: "Reviews", children: "Reviews", key: "2", closable: true },
 { label: "Specifications", children: "Specifications", key: "3", closable: true },
 { label: "Pricing", children: "Pricing", key: "4", closable: true },
 { label: "Installation", children: "Installation Instructions", key: "5" },
 { label: "Certifications", children: "Certifications", key: "6" },
];

<TabView
  visibleTabs={["1","5","6"]}
  tabs={tabs}
  activeKey="1"
  id="tabview-2"
  persistState={false}
/>'
        />
      </Section>

      <Section title={t("tabview.usage.positionBottom")}>
        <TabView
          visibleTabs={["1", "5", "6"]}
          tabs={tabs}
          activeKey="1"
          id="tabview-4"
          position="bottom"
        />
        <CodeBlock
          exampleCode='
const tabs = [
 { label: "Description", children: "Description", key: "1" },
 { label: "Reviews", children: "Reviews", key: "2", closable: true },
 { label: "Specifications", children: "Specifications", key: "3", closable: true },
 { label: "Pricing", children: "Pricing", key: "4", closable: true },
 { label: "Installation", children: "Installation Instructions", key: "5" },
 { label: "Certifications", children: "Certifications", key: "6" },
];

<TabView
  visibleTabs={["1","5","6"]}
  tabs={tabs}
  activeKey="1"
  id="tabview-4"
  position="bottom"
/>'
        />
      </Section>

      <Section title={t("tabview.usage.positionLeft")}>
        <TabView
          visibleTabs={["1", "5", "6"]}
          tabs={tabs}
          activeKey="1"
          id="tabview-5"
          position="left"
        />
        <CodeBlock
          exampleCode='
const tabs = [
 { label: "Description", children: "Description", key: "1" },
 { label: "Reviews", children: "Reviews", key: "2", closable: true },
 { label: "Specifications", children: "Specifications", key: "3", closable: true },
 { label: "Pricing", children: "Pricing", key: "4", closable: true },
 { label: "Installation", children: "Installation Instructions", key: "5" },
 { label: "Certifications", children: "Certifications", key: "6" },
];
    
<TabView
  visibleTabs={["1","5","6"]}
  tabs={tabs}
  activeKey="1"
  id="tabview-5"
  position="left"
  onVisibleTabsChange={setCustomVisibleTabs}
/>'
        />
      </Section>

      <Section title={t("tabview.usage.positionRight")}>
        <TabView
          visibleTabs={["1", "5", "6"]}
          tabs={tabs}
          activeKey="1"
          id="tabview-6"
          position="right"
        />
        <CodeBlock
          exampleCode='
const tabs = [
 { label: "Description", children: "Description", key: "1" },
 { label: "Reviews", children: "Reviews", key: "2", closable: true },
 { label: "Specifications", children: "Specifications", key: "3", closable: true },
 { label: "Pricing", children: "Pricing", key: "4", closable: true },
 { label: "Installation", children: "Installation Instructions", key: "5" },
 { label: "Certifications", children: "Certifications", key: "6" },
];
    
<TabView
  visibleTabs={["1","5","6"]}
  tabs={tabs}
  activeKey="1"
  id="tabview-6"
  position="right"
/>'
        />
      </Section>

      <Section title={t("tabview.usage.closable")}>
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
          activeKey={active}
          id="tabview-3"
          onVisibleTabsChange={setVisibleTabs}
          onActiveTabChange={setActive}
        />
        <CodeBlock
          exampleCode='
const tabs = [
 { label: "Description", children: "Description", key: "1" },
 { label: "Reviews", children: "Reviews", key: "2", closable: true },
 { label: "Specifications", children: "Specifications", key: "3", closable: true },
 { label: "Pricing", children: "Pricing", key: "4", closable: true },
 { label: "Installation", children: "Installation Instructions", key: "5" },
 { label: "Certifications", children: "Certifications", key: "6" },
];

export const addTab = (
  key: string,
  visibleTabs: any[],
  setVisibleTabs: any,
  setActive: any,
) => {
  const existingTab = visibleTabs.find((tab) => tab === key);
  
  if (existingTab) {
    setActive(existingTab);
  } else {
    setVisibleTabs([...visibleTabs, key]);
    setActive(key);
  }
};
          
const [visibleTabs, setVisibleTabs] = useState([{ key: "1" }]);
const [active, setActive] = useState("1");

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
  activeKey={active}
  id="tabview-3"
  onVisibleTabsChange={setVisibleTabs}
/>'
        />
      </Section>

      <Section title={t("tabview.usage.intercept")}>
        <div className="tab-button-group">
          <Button
            label="Add installation tab"
            onClick={() =>
              addTab(
                "5",
                controlledVisibleTabs,
                setControlledVisibleTabs,
                setControlledActiveTab,
              )
            }
          />
          <Button
            label="Add pricing tab"
            onClick={() =>
              addTab(
                "4",
                controlledVisibleTabs,
                setControlledVisibleTabs,
                setControlledActiveTab,
              )
            }
          />
        </div>
        <TabView
          tabs={[
            { label: "Description", children: "Description", key: "1" },
            { label: "Reviews", children: "Reviews", key: "2" },
            {
              label: "Specifications",
              children: "Specifications",
              key: "3",
            },
            { label: "Pricing", children: "Pricing", key: "4" },
            {
              label: "Installation",
              children: "Installation Instructions",
              key: "5",
              closable: true,
            },
            { label: "Certifications", children: "Certifications", key: "6" },
          ]}
          id="tabview-7"
          activeKey={controlledActiveTab}
          visibleTabs={controlledVisibleTabs}
          interceptTabChange={true}
          onActiveTabChange={handleTabChange}
          onTabClose={handleTabClose}
        />
        <ConfirmationModal
          message="Are you sure you want to proceed?"
          visible={showModal}
          onHide={cancelTabSwitch}
          accept={confirmTabSwitch}
        />

        <CodeBlock
          exampleCode='
const [interceptVisibleTabs, setInterceptVisibleTabs] = useState(["1", "2", "4"])
const [interceptActiveTab, setInterceptActiveTab] = useState("1")
const [showModal, setShowModal] = useState(false);
const [requestedTab, setRequestedTab] = useState<string | null>(null);

const handleTabChange = (key: string) => {
  if (key !== interceptActiveTab) {
    setRequestedTab(key);
    setShowModal(true);
  }
};

const confirmTabSwitch = () => {
  if (requestedTab) {
    setInterceptActiveTab(requestedTab);
    setRequestedTab(null);
  }
  setShowModal(false);
};

const cancelTabSwitch = () => {
  setRequestedTab(null);
  setShowModal(false);
};

const handleTabClose = (key: string) => {
  const tabIndex = interceptVisibleTabs.findIndex((tab) => tab === key);
  const newVisibleTabs = interceptVisibleTabs.filter((tab) => tab !== key);

  let newActiveTab = "";
  if (tabIndex > 0) {
    newActiveTab = newVisibleTabs[tabIndex - 1];
  } else {
    newActiveTab = newVisibleTabs[0];
  }

  setInterceptActiveTab(newActiveTab);
  setInterceptVisibleTabs(newVisibleTabs);
}

export const addTab = (
  key: string,
  visibleTabs: any[],
  setVisibleTabs: any,
  setActive: any,
) => {
  const existingTab = visibleTabs.find((tab) => tab === key);
  
  if (existingTab) {
    setActive(existingTab);
  } else {
    setVisibleTabs([...visibleTabs, key]);
    setActive(key);
  }
};

<div className="tab-button-group">
<Button
  label="Add installation tab"
  onClick={() => addTab("5", interceptVisibleTabs, setInterceptVisibleTabs, setInterceptActiveTab)}
/>
<Button
  label="Add pricing tab"
  onClick={() => addTab("4", interceptVisibleTabs, setInterceptVisibleTabs, setInterceptActiveTab)}
/>
</div>

<TabView
  tabs={[
    { label: "Description", children: "Description", key: "1" },
    { label: "Reviews", children: "Reviews", key: "2" },
    {
      label: "Specifications",
      children: "Specifications",
      key: "3",
    },
    { label: "Pricing", children: "Pricing", key: "4" },
    {
      label: "Installation",
      children: "Installation Instructions",
      key: "5",
      closable: true
    },
    { label: "Certifications", children: "Certifications", key: "6" },
  ]}
  id="tabview-7"
  activeKey={interceptActiveTab}
  visibleTabs={interceptVisibleTabs}
  isControlled={true}
  onActiveTabChange={handleTabChange}
  onTabClose={handleTabClose}
/>
<ConfirmationModal
  message="Are you sure you want to proceed?"
  visible={showModal}
  onHide={cancelTabSwitch}
  accept={confirmTabSwitch}
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
      <Section title="Type">
        <CodeBlock
          exampleCode="
tabs = {
  children: React.ReactNode;
  closable?: boolean;
  icon?: string;
  key: string;
  label: string;
}[];

visibleTabs: string[]
"
        />
      </Section>
    </Page>
  );
};
