import { useTranslation } from "@dzangolab/react-i18n";
import { Page, Typeahead } from "@dzangolab/react-ui";

import { Section } from "../../../components/Demo";

export const TypeaheadDemo = () => {
  const [t] = useTranslation("ui");

  return (
    <Page title={t("typeahead.title")}>
      <Section>
        <Typeahead />
      </Section>
    </Page>
  );
};
