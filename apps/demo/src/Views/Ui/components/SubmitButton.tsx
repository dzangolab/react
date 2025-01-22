import { useTranslation } from "@dzangolab/react-i18n";
import { Page, SubmitButton } from "@dzangolab/react-ui";
import { TDataTable } from "@dzangolab/react-ui";

import { CodeBlock, Section } from "../../../components/Demo";

const data = [
  {
    id: 1,
    prop: "disabled",
    type: "boolean",
    description: "If true, the button will be disabled and non-interactive.",
  },
  {
    id: 2,
    prop: "label",
    type: "string",
    description: "Text to be displayed in the button.",
  },
  {
    id: 3,
    prop: "loading",
    type: "boolean",
    description:
      "If true, indicates that the button is in a loading state and disables user interaction.",
  },
];

export const SubmitButtonDemo = () => {
  const [t] = useTranslation("ui");

  return (
    <Page title={t("submitButton.title")}>
      <Section title={t("headers.usage")}>
        <p>{t("common.usage", { component: "SubmitButton" })}</p>
        <CodeBlock exampleCode="import { SubmitButton } from '@dzangolab/react-ui';" />
      </Section>
      <Section title={t("submitButton.usage.basic")}>
        <SubmitButton label="Submit" />
        <CodeBlock exampleCode="<SubmitButton label='Submit'/>" />
      </Section>
      <Section title={t("submitButton.usage.loading")}>
        <SubmitButton label="Submit loading" loading />
        <CodeBlock exampleCode="<SubmitButton label='Submit loading' loading/>" />
      </Section>
      <Section
        title={t("headers.propertiesValue", {
          value: "SubmitButtonProperties",
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
