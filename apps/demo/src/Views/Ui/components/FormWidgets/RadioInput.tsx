import { useTranslation } from "@dzangolab/react-i18n";
import { RadioInput, Page } from "@dzangolab/react-ui";

import { Section } from "../../../../components/Demo";

export const RadioInputDemo = () => {
  const [t] = useTranslation("ui");

  return (
    <Page title={t("radioInput.title")}>
      <Section>
        <RadioInput label={"Option 1"} />
        <RadioInput label={"Option 2"} />
        <RadioInput label={"Option 3"} />
      </Section>
    </Page>
  );
};
