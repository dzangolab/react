import { useTranslation } from "@dzangolab/react-i18n";
import { Page, SwitchInput } from "@dzangolab/react-ui";

import { Section } from "../../../../components/Demo";

export const SwitchInputDemo = () => {
  const [t] = useTranslation("ui");

  return (
    <Page title={t("switchInput.title")}>
      <Section>
        <SwitchInput label="Check here" />
        <SwitchInput label="Invalid input" hasError={true} />
        <SwitchInput label="Disabled input" disabled={true} />
      </Section>
    </Page>
  );
};
