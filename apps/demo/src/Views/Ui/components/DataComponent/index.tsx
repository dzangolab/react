import { useTranslation } from "@dzangolab/react-i18n";
import { Data, GridContainer, Page, TDataTable } from "@dzangolab/react-ui";

import { CodeBlock, Section } from "../../../../components/Demo";

const data = [
  {
    id: 1,
    prop: "label",
    type: "ReactNode",
    description: "The label displayed alongside the value. Required.",
  },
  {
    id: 2,
    prop: "value",
    type: "ReactNode | object",
    description: "The value to display. Can be a static value or an object.",
  },
  {
    id: 3,
    prop: "dataKey",
    type: "string",
    description:
      "A key used to extract a specific value from the 'value' object. Optional.",
  },
  {
    id: 4,
    prop: "className",
    type: "string",
    description:
      "Additional CSS classes to apply to the outer container. Optional.",
  },
];

export const DataDemo = () => {
  const testData = [
    {
      label: "Name",
      value: "John Doe",
    },
    {
      label: "Age",
      value: 30,
    },
    {
      label: "Email",
      value: { email: "john.doe@example.com", user: "John Doe" },
      dataKey: "email",
    },
    {
      label: "Address",
      value: "123 Main St, Springfield, USA",
    },
    {
      label: "Status",
      value: "Active",
    },
  ];

  const { t } = useTranslation("ui");

  return (
    <Page
      className="demo-data-component"
      title={t("dataComponent.title")}
      subtitle={t("dataComponent.subtitle")}
    >
      <Section title={t("headers.usage")}>
        <p>{t("common.usage", { component: "Data" })}</p>
        <CodeBlock exampleCode="import { Data } from '@dzangolab/react-ui';" />
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
              accessorKey: "description",
              header: "Description",
            },
          ]}
          data={data}
          paginated={false}
        />
      </Section>

      <Section title={t("dataComponent.usage.basic")}>
        <Data label="Name" value="John Doe" />
        <CodeBlock exampleCode="<Data label='Name' value='John Doe' />" />
      </Section>

      <Section title={t("dataComponent.usage.displayObject")}>
        <Data
          label="Email"
          value={{ email: "john.doe@example.com", id: 1 }}
          dataKey="email"
        />
        <CodeBlock
          exampleCode="<Data
  label='User Email'
  value={{ email: 'john.doe@example.com', id: 1 }}
  dataKey='email'
/>"
        />
      </Section>

      <Section title={t("dataComponent.usage.example")}>
        <GridContainer>
          {testData.map((data, index) => (
            <Data key={index} {...data} />
          ))}
        </GridContainer>
        <CodeBlock
          exampleCode="const testData = [
    {
      label: 'Name',
      value: 'John Doe',
    },
    {
      label: 'Age',
      value: 30,
    },
    {
      label: 'Email',
      value: { 
        email: 'john.doe@example.com',
        user: 'John Doe' 
      },
      dataKey: 'email',
    },
    {
      label: 'Address',
      value: '123 Main St, Springfield, USA',
    },
    {
      label: 'Status',
      value: 'Active',
    },
  ];

return ( 
  <GridContainer>
    {testData.map((data, index) => (
      <Data key={index} {...data} />
    ))}
  </GridContainer>);"
        />
      </Section>
    </Page>
  );
};
