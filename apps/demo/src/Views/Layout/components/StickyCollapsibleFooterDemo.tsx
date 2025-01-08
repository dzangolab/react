import { useTranslation } from "@dzangolab/react-i18n";
import { StickyCollapsibleFooter } from "@dzangolab/react-layout";
import { Page } from "@dzangolab/react-ui";

export const StickyCollapsibleFooterDemo = () => {
  const [t] = useTranslation("ui");

  return (
    <Page title="Sticky collapsible footer">
      <StickyCollapsibleFooter>This is footer content.</StickyCollapsibleFooter>
    </Page>
  );
};
