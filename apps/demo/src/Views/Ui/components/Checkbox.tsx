import { useTranslation } from "@dzangolab/react-i18n";
import { Checkbox, Page } from "@dzangolab/react-ui";

import { Section } from "../../../components/Demo";

export const CheckboxDemo = () => {
  const [t] = useTranslation("ui");

  return (
    <Page title={t("checkbox.title")}>
      <Section>
        <Checkbox label="Check here" />
      </Section>
    </Page>
  );
};
