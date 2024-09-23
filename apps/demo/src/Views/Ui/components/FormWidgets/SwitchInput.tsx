import { useTranslation } from "@dzangolab/react-i18n";
import { Page, TDataTable } from "@dzangolab/react-ui";

import { Basic, CONTROLLED, Disabled, Invalid } from "./components";
import { CodeBlock, Section } from "../../../../components/Demo";

const data = [
  {
    id: 1,
    prop: "disabled",
    type: "boolean",
    description: "If true, the switch is disabled.",
  },
  {
    id: 2,
    prop: "errorMessage",
    type: "string",
    description:
      "Message to display when there is an error associated with the switch.",
  },
  {
    id: 3,
    prop: "hasError",
    type: "boolean",
    description: "If true, indicates that there is an error.",
  },
  {
    id: 4,
    prop: "label",
    type: "string",
    description: "The label for the switch.",
  },
  {
    id: 5,
    prop: "name",
    type: "string",
    description: "The name of the switch input, used for form handling.",
  },
  {
    id: 6,
    prop: "...others",
    type: "InputHTMLAttributes",
    description: "Any other attributes for the input element.",
  },
];

export const SwitchInputDemo = () => {
  const [t] = useTranslation("ui");

  return (
    <Page
      className="demo-switch-input"
      title={t("switchInput.title")}
      subtitle={t("switchInput.subtitle")}
    >
      <Section title={t("headers.usage")}>
        <p>{t("common.usage", { component: "SwitchInput" })}</p>
        <CodeBlock exampleCode="import { SwitchInput } from '@dzangolab/react-ui';" />
      </Section>

      <Section
        title={t("headers.propertiesValue", {
          value: "ISwitchInputProperties",
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

      <Section title={t("switchInput.basic")}>
        <Basic />
        <CodeBlock
          exampleCode={Basic({ isString: true }) as string}
        ></CodeBlock>
      </Section>

      <Section title={t("switchInput.invalidInput")}>
        <Invalid />
        <CodeBlock
          exampleCode={Invalid({ isString: true }) as string}
        ></CodeBlock>
      </Section>

      <Section title={t("switchInput.disabledInput")}>
        <Disabled />
        <CodeBlock
          exampleCode={Disabled({ isString: true }) as string}
        ></CodeBlock>
      </Section>

      <Section title={t("switchInput.controlled")}>
        <CodeBlock exampleCode={CONTROLLED}></CodeBlock>
      </Section>
    </Page>
  );
};
