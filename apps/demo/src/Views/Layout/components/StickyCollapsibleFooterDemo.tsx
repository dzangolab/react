import { useTranslation } from "@dzangolab/react-i18n";
import { StickyCollapsibleFooter } from "@dzangolab/react-layout";
import { Page } from "@dzangolab/react-ui";

export const StickyCollapsibleFooterDemo = () => {
  const [t] = useTranslation("layout");

  return (
    <Page title={t("stickyCollapsibleFooter.title")}>
      <StickyCollapsibleFooter>This is footer content.</StickyCollapsibleFooter>
    </Page>
  );
};
