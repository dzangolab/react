import { useTranslation } from "@dzangolab/react-i18n";
import { Page, Textarea } from "@dzangolab/react-ui";

import { Section } from "../../../../components/Demo";

export const TextareaDemo = () => {
  const [t] = useTranslation("ui");

  return (
    <Page title={t("textarea.title")}>
      <Section>
        <Textarea
          placeholder={t("textarea.placeHolder")}
          label={t("textarea.label")}
        />
      </Section>
      <Section>
        <Textarea
          hasError={true}
          errorMessage={t("textarea.errorMessage")}
          placeholder={t("textarea.placeHolder")}
          label={t("textarea.label")}
        />
      </Section>
    </Page>
  );
};
