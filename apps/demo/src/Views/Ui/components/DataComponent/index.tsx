import { useTranslation } from "@dzangolab/react-i18n";
import {
  Button,
  Data,
  GridContainer,
  Page,
  TDataTable,
} from "@dzangolab/react-ui";
import { useNavigate } from "react-router-dom";

import { CodeBlock, Section } from "../../../../components/Demo";

const data = [
  {
    id: 1,
    prop: "caption",
    type: "ReactNode",
    default: "-",
    description: "The caption displayed alongside the value.",
  },
  {
    id: 2,
    prop: "className",
    type: "string",
    default: "-",
    description: "Additional CSS classes to apply to the outer container.",
  },
  {
    id: 3,
    prop: "mode",
    type: '"attr" | "stat"',
    default: "attr",
    description: "Defines which styling to apply to the component.",
  },
  {
    id: 4,
    prop: "value",
    type: "ReactNode",
    default: "-",
    description: "The value to display.",
  },
];

export const DataDemo = () => {
  const testData = [
    {
      caption: "Name",
      value: "John Smith",
    },
    {
      caption: "Age",
      value: 30,
    },
    {
      caption: "Email",
      value: "john.smith@example.com",
    },
    {
      caption: "Address",
      value: "123 Main St, Springfield, USA",
    },
    {
      caption: "Status",
      value: "Active",
    },
  ];

  const { t } = useTranslation("ui");
  const navigate = useNavigate();

  return (
    <Page
      className="demo-data-component"
      title={t("data.title")}
      subtitle={t("data.subtitle")}
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
        <p>{t("common.usage", { component: "Data" })}</p>
        <CodeBlock exampleCode="import { Data } from '@dzangolab/react-ui';" />
      </Section>

      <Section title={t("data.usage.basic")}>
        <Data caption="Name" value="John Smith" />
        <CodeBlock exampleCode='<Data caption="Name" value="John Smith"/>' />
      </Section>

      <Section title={t("data.usage.mode")}>
        <div className="data-stat-group">
          <Data caption="Visitors" value="3,825" mode="stat" />
          <Data caption="Revenue" value="$1,030,217" mode="stat" />
        </div>
        <CodeBlock
          exampleCode='<div className="data-group">
  <Data caption="Visitors" value="3,825" mode="stat" />
  <Data caption="Revenue" value="$1,030,217" mode="stat" />
</div>'
        />
      </Section>

      <Section title={t("data.usage.structuredData")}>
        <GridContainer>
          {testData.map((data, index) => (
            <Data key={index} {...data} />
          ))}
        </GridContainer>
        <CodeBlock
          exampleCode='const testData = [
  {
    caption: "Name",
    value: "John Smith",
  },
  {
    caption: "Age",
    value: 30,
  },
  {
    caption: "Email",
    value: "john.smith@example.com",
  },
  {
    caption: "Address",
    value: "123 Main St, Springfield, USA",
  },
  {
    caption: "Status",
    value: "Active",
  },
];

return ( 
  <GridContainer>
    {testData.map((data, index) => (
      <Data key={index} {...data} />
    ))}
  </GridContainer>);'
        />
      </Section>

      <Section
        title={t("headers.propertiesValue", {
          value: "DataProperties",
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
