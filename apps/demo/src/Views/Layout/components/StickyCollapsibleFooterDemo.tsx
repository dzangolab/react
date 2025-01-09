import { useTranslation } from "@dzangolab/react-i18n";
import { StickyCollapsibleFooter } from "@dzangolab/react-layout";
import { Card, CardBody, Page } from "@dzangolab/react-ui";

export const StickyCollapsibleFooterDemo = () => {
  const [t] = useTranslation("layout");

  return (
    <>
      <Page
        title={t("stickyCollapsibleFooter.title.footerAbsolute")}
        subtitle={t("stickyCollapsibleFooter.subtitle.footerAbsolute")}
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
      <hr />
      <Page
        title={t("stickyCollapsibleFooter.title.footerFixed")}
        subtitle={t("stickyCollapsibleFooter.subtitle.footerFixed")}
      >
        <StickyCollapsibleFooter>
          This is sticky collapsible footer component.
        </StickyCollapsibleFooter>
      </Page>
    </>
  );
};
