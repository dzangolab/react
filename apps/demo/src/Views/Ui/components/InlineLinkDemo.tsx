import { useTranslation } from "@dzangolab/react-i18n";
import { Page, InlineLink, TDataTable } from "@dzangolab/react-ui";

import { CodeBlock, Section } from "../../../components/Demo";

const data = [
  {
    id: 1,
    prop: "className",
    type: "string",
    description: "Additional CSS classes to apply to the component.",
  },
  {
    id: 2,
    prop: "external",
    type: "boolean",
    description:
      "Determines whether the link is an external link or an internal link. Defaults to false.",
  },
  {
    id: 3,
    prop: "label",
    type: "ReactNode",
    description: "Content to display inside the link component.",
  },
  {
    id: 4,
    prop: "target",
    type: "string",
    description:
      "Specifies where to open the linked document. Only meant for external links.",
  },
  {
    id: 5,
    prop: "to",
    type: "string",
    description: "Specifies the link's destination.",
  },
  {
    id: 6,
    prop: "underlined",
    type: "boolean",
    description: "If true, the link must be underlined by default.",
  },
];

export const InlineLinkDemo = () => {
  const [t] = useTranslation("ui");

  return (
    <Page title={t("inlineLink.title")}>
      <Section title={t("headers.usage")}>
        <p>{t("common.usage", { component: "Inline link" })}</p>
        <CodeBlock exampleCode="import { InlineLink } from 'dzangolab/react-ui';" />
      </Section>
      <Section>
        <div className="links">
          <InlineLink label={t("inlineLink.label")} to="/ui" underlined />
          <InlineLink label={t("inlineLink.label")} to="/ui" />
        </div>
        <CodeBlock
          exampleCode="<div className='inline-link'>
  <InlineLink label={t('inlineLink.label')} to='/ui' underlined/>
  <InlineLink label={t('inlineLink.label')} to='/ui'/>
</div>"
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
