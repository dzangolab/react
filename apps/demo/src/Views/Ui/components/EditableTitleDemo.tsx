import { useTranslation } from "@dzangolab/react-i18n";
import { EditableTitle, Page } from "@dzangolab/react-ui";
import { ChangeEvent, useState } from "react";

import { Section } from "../../../components/Demo";

export const EditableTitleDemo = () => {
  const [title, setTitle] = useState("Hello");
  const { t } = useTranslation("ui");

  const handleTitleUpdate = (title: string) => {
    // eslint-disable-next-line no-console
    console.log("The updated title is:", title);
  };

  return (
    <Page title={t("editableTitle.title")}>
      <Section title={t("editableTitle.controlledType")}>
        <EditableTitle
          titleLevel="h3"
          title={title}
          onTitleChange={(event: ChangeEvent<HTMLInputElement>) =>
            setTitle(event.target.value)
          }
          onTitleUpdate={handleTitleUpdate}
        />
      </Section>
      <Section title={t("editableTitle.uncontrolledType")}>
        <EditableTitle
          title={title}
          onTitleUpdate={handleTitleUpdate}
          titleLevel="h3"
        />
      </Section>
    </Page>
  );
};
