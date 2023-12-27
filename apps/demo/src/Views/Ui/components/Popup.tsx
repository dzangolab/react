import { useTranslation } from "@dzangolab/react-i18n";
import { Button, Popup, Page } from "@dzangolab/react-ui";

import { Section } from "../../../components/Demo";

export const PopupDemo = () => {
  const [t] = useTranslation("ui");

  return (
    <Page title={t("popup.title")}>
      <Section>
        <Popup
          trigger={<Button iconLeft={"pi pi-angle-double-right"}></Button>}
          content={<div style={{ padding: "1rem" }}>Popup content</div>}
          position="right"
          offset={20}
        />
      </Section>
    </Page>
  );
};
