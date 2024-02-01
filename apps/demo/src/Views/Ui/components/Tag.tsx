import { useTranslation } from "@dzangolab/react-i18n";
import { Page, Tag } from "@dzangolab/react-ui";

import { Section } from "../../../components/Demo";

export const TagDemo = () => {
  const [t] = useTranslation("ui");

  return (
    <Page title={t("tag.title")}>
      <Section>
        <Tag icon="pi pi-user" label="tag" />
      </Section>
    </Page>
  );
};
