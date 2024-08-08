import { useTranslation } from "@dzangolab/react-i18n";
import { TDataTable, Page } from "@dzangolab/react-ui";

import "./index.css";

import { Basic, Icon, Link, Severity, Size, Variant } from "./components";
import { CodeBlock, Section } from "../../../../components/Demo";

const data = [
  {
    id: 1,
    prop: "children",
    type: "string | ReactNode",
    description: "The content to be displayed inside the button.",
  },
  {
    id: 2,
    prop: "className",
    type: "string",
    description: "Additional CSS classes to apply to the button.",
  },
  {
    id: 3,
    prop: "disabled",
    type: "boolean",
    description: "If true, the button will be disabled and non-interactive.",
  },
  {
    id: 4,
    prop: "iconLeft",
    type: "string | ReactNode",
    description:
      "Icon to be displayed on the left side of the button. Can be a string (class name) or a ReactNode.",
  },
  {
    id: 5,
    prop: "iconRight",
    type: "string | ReactNode",
    description:
      "Icon to be displayed on the right side of the button. Can be a string (class name) or a ReactNode.",
  },
  {
    id: 6,
    prop: "label",
    type: "string",
    description:
      "Text to be displayed in the button when `children` is not provided.",
  },
  {
    id: 7,
    prop: "loading",
    type: "boolean",
    description:
      "If true, indicates that the button is in a loading state and disables user interaction.",
  },
  {
    id: 8,
    prop: "onClick",
    type: "() => void",
    description: "Function to be called when the button is clicked.",
  },
  {
    id: 9,
    prop: "severity",
    type: '"primary" | "secondary" | "alternate" | "success" | "danger" | "warning"',
    description:
      "Defines the styling severity of the button. Defaults to 'primary'.",
  },
  {
    id: 10,
    prop: "size",
    type: '"small" | "medium" | "large"',
    description: "Sets the size of the button. Defaults to 'medium'.",
  },
  {
    id: 11,
    prop: "to",
    type: "string",
    description:
      "If provided, the button will act as a `Link` to the specified path instead of a regular button.",
  },
  {
    id: 12,
    prop: "title",
    type: "string",
    description: "Tooltip text that appears on hover.",
  },
  {
    id: 13,
    prop: "variant",
    type: '"outlined" | "filled" | "textOnly"',
    description: "Specifies the button variant. Defaults to 'filled'.",
  },
];

export const ButtonDemo = () => {
  const { t } = useTranslation("ui");

  return (
    <Page
      className="demo-button"
      title={t("button.title")}
      subtitle={t("button.subtitle")}
    >
      <Section title={t("headers.usage")}>
        <p>{t("common.usage", { component: "Button" })}</p>
        <CodeBlock exampleCode="import { Button } from '@dzangolab/react-ui';" />
      </Section>

      <Section
        title={t("headers.propertiesValue", {
          value: "IButtonProperties",
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

      <Section title={t("button.usage.basic")}>
        <Basic />
        <CodeBlock
          exampleCode={Basic({ isString: true }) as string}
        ></CodeBlock>
      </Section>

      <Section title={t("button.usage.severity")}>
        <Severity />
        <CodeBlock
          exampleCode={Severity({ isString: true }) as string}
        ></CodeBlock>
      </Section>

      <Section title={t("button.usage.size")}>
        <Size />
        <CodeBlock exampleCode={Size({ isString: true }) as string}></CodeBlock>
      </Section>

      <Section title={t("button.usage.variant")}>
        <Variant />
        <CodeBlock
          exampleCode={Variant({ isString: true }) as string}
        ></CodeBlock>
      </Section>

      <Section title={t("button.usage.icons")}>
        <Icon />
        <CodeBlock exampleCode={Icon({ isString: true }) as string}></CodeBlock>
      </Section>

      <Section title={t("button.usage.link")}>
        <Link />
        <CodeBlock exampleCode={Link({ isString: true }) as string}></CodeBlock>
      </Section>
    </Page>
  );
};
