import { useTranslation } from "@dzangolab/react-i18n";
import { Page, SwitchInput } from "@dzangolab/react-ui";

import { Section } from "../../../../components/Demo";

export const SwitchInputDemo = () => {
  const [t] = useTranslation("ui");

  return (
    <Page title={t("switchInput.title")}>
      <Section>
        <SwitchInput label={t("switchInput.normalInput")} />
        <SwitchInput label={t("switchInput.invalidInput")} hasError={true} />
        <SwitchInput label={t("switchInput.disabledInput")} disabled={true} />
      </Section>
    </Page>
  );
};
