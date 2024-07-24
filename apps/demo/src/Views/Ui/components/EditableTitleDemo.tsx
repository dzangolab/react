import { useTranslation } from "@dzangolab/react-i18n";
import { EditableTitle, Page } from "@dzangolab/react-ui";

import { Section } from "../../../components/Demo";

export const EditableTitleDemo = () => {
  const { t } = useTranslation("ui");

  const handleTitleUpdate = (title: string) => {
    // eslint-disable-next-line no-console
    console.log("The updated title is:", title);
  };

  return (
    <Page title={t("editableTitle.title")}>
      <Section title={t("editableTitle.uncontrolledType")}>
        <EditableTitle
          title={"Hello"}
          onTitleUpdate={handleTitleUpdate}
          titleLevel="h3"
          isTogglerEnabled={true}
        />
      </Section>
    </Page>
  );
};
