import { useTranslation } from "@dzangolab/react-i18n";
import { StickyCollapsibleFooter } from "@dzangolab/react-layout";
import { Card, CardBody, Page, TDataTable } from "@dzangolab/react-ui";

import { CodeBlock, Section } from "../../../components/Demo";

const data = [
  {
    id: 1,
    prop: "children",
    type: "ReactNode",
    description:
      "The content to be displayed inside the sticky collapsible footer.",
  },
  {
    id: 2,
    prop: "fixed",
    type: "boolean",
    description:
      "If true, indicates that the position of the sticky collapsible footer is fixed at the viewport; otherwise it is positioned at the bottom of the parent container.",
  },
];

export const StickyCollapsibleFooterDemo = () => {
  const [t] = useTranslation("layout");

  return (
    <>
      <Page
        title={t("stickyCollapsibleFooter.title")}
        className="sticky-collapsible-footer"
      >
        <Section title={t("headers.usage")}>
          <p>{t("common.usage", { component: "Sticky collapsible footer" })}</p>
          <CodeBlock exampleCode="import { StickyCollapsibleFooter } from '@dzangolab/react-layout';" />
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

        <Section title={t("stickyCollapsibleFooter.usage.footerFixed")}>
          <p>{t("stickyCollapsibleFooter.subtitle.footerFixed")}</p>
          <CodeBlock
            exampleCode="<StickyCollapsibleFooter fixed>
  This is sticky collapsible footer component.
</StickyCollapsibleFooter>"
          />
          <StickyCollapsibleFooter fixed>
            This is sticky collapsible footer component.
          </StickyCollapsibleFooter>
        </Section>
        <Section title={t("stickyCollapsibleFooter.usage.footerAbsolute")}>
          <p>{t("stickyCollapsibleFooter.subtitle.footerAbsolute")}</p>
          <CodeBlock
            exampleCode="<Card outlined>
  <CardBody>
    <div style={{ height: '20vh' }}>Body content</div>
  </CardBody>
  <StickyCollapsibleFooter>
    This is sticky collapsible footer component.
  </StickyCollapsibleFooter>
</Card>"
          />
          <Card outlined>
            <CardBody>
              <div style={{ height: "20vh" }}>Body content</div>
            </CardBody>
            <StickyCollapsibleFooter>
              This is sticky collapsible footer component.
            </StickyCollapsibleFooter>
          </Card>
        </Section>
      </Page>
    </>
  );
};
