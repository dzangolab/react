import { useTranslation } from "@dzangolab/react-i18n";
import { Page, SubmitButton } from "@dzangolab/react-ui";

import { Section } from "../../../components/Demo";

export const SubmitButtonDemo = () => {
  const [t] = useTranslation("ui");

  return (
    <Page title={t("submitButton.title")}>
      <Section>
        <SubmitButton label="Submit" />
      </Section>
      <Section>
        <SubmitButton label="Submit loading" loading />
      </Section>
    </Page>
  );
};
