import { useTranslation } from "@dzangolab/react-i18n";
import { StickyCollapsibleFooter } from "@dzangolab/react-layout";
import { Card, CardBody, Page } from "@dzangolab/react-ui";

export const StickyCollapsibleFooterDemo = () => {
  const [t] = useTranslation("layout");

  return (
    <Page
      title={t("stickyCollapsibleFooter.title")}
      subtitle={t("stickyCollapsibleFooter.subtitle")}
      className="sticky-collapsible-footer"
    >
      <Card outlined>
        <CardBody>
          <div style={{ height: "20vh" }}>Body content</div>
        </CardBody>
        <StickyCollapsibleFooter>
          This is sticky collapsible footer component.
        </StickyCollapsibleFooter>
      </Card>
    </Page>
  );
};
