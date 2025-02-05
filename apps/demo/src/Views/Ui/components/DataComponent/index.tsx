import { useTranslation } from "@dzangolab/react-i18n";
import { Data, GridContainer, Page, TDataTable } from "@dzangolab/react-ui";

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
    prop: "value",
    type: "ReactNode",
    default: "-",
    description: "The value to display.",
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
    prop: "className",
    type: "string",
    default: "-",
    description: "Additional CSS classes to apply to the outer container.",
  },
];

export const DataDemo = () => {
  const testData = [
    {
      caption: "Name",
      value: "John Doe",
    },
    {
      caption: "Age",
      value: 30,
    },
    {
      caption: "Email",
      value: "john.doe@example.com",
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

  return (
    <Page
      className="demo-data-component"
      title={t("data.title")}
      subtitle={t("data.subtitle")}
    >
      <Section title={t("headers.usage")}>
        <p>{t("common.usage", { component: "Data" })}</p>
        <CodeBlock exampleCode="import { Data } from '@dzangolab/react-ui';" />
      </Section>

      <Section title={t("data.usage.basic")}>
        <Data caption="Name" value="John Doe" mode="stat" />
        <CodeBlock exampleCode='<Data caption="Name" value="John Doe" />' />
      </Section>

      <Section title={t("data.usage.example")}>
        <GridContainer>
          {testData.map((data, index) => (
            <Data key={index} {...data} />
          ))}
        </GridContainer>
        <CodeBlock
          exampleCode='const testData = [
  {
    caption: "Name",
    value: "John Doe",
  },
  {
    caption: "Age",
    value: 30,
  },
  {
    caption: "Email",
    value: "john.doe@example.com",
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
