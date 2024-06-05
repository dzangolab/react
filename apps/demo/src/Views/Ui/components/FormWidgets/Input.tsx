import { useTranslation } from "@dzangolab/react-i18n";
import { Input, Page } from "@dzangolab/react-ui";

import { Section } from "../../../../components/Demo";

export const InputDemo = () => {
  const [t] = useTranslation("ui");

  return (
    <Page title={t("input.title")}>
      <Section>
        <Input placeholder="Input placeholder" label="Input label" />
      </Section>
      <Section>
        <Input
          hasError={true}
          errorMessage="Invalid input"
          placeholder="Input placeholder"
          label="Input label"
        />
      </Section>
    </Page>
  );
};
