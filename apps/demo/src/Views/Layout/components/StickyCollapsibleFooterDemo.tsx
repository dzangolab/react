import { useTranslation } from "@dzangolab/react-i18n";
import { StickyCollapsibleFooter } from "@dzangolab/react-layout";
import { Page } from "@dzangolab/react-ui";

export const StickyCollapsibleFooterDemo = () => {
  const [t] = useTranslation("layout");

  return (
    <Page
      title={t("stickyCollapsibleFooter.title")}
      subtitle={t("stickyCollapsibleFooter.subtitle")}
    >
      <StickyCollapsibleFooter>
        This is sticky collapsible footer component.
      </StickyCollapsibleFooter>
    </Page>
  );
};
