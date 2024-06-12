import { useTranslation } from "@dzangolab/react-i18n";
import { Page, Textarea } from "@dzangolab/react-ui";

import { Section } from "../../../../components/Demo";

export const TextareaDemo = () => {
  const [t] = useTranslation("ui");

  return (
    <Page title={t("textarea.title")}>
      <Section>
        <Textarea placeholder="Textarea placeholder" label="Textarea label" />
      </Section>
      <Section>
        <Textarea
          hasError={true}
          errorMessage="Invalid input"
          placeholder="Textarea placeholder"
          label="Textarea label"
        />
      </Section>
    </Page>
  );
};
