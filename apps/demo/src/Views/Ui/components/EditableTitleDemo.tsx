import { useTranslation } from "@dzangolab/react-i18n";
import { EditableTitle, Page } from "@dzangolab/react-ui";
import { useState } from "react";

export const EditableTitleDemo = () => {
  const [title, setTitle] = useState("Hello");
  const { t } = useTranslation("ui");

  return (
    <Page title={t("editableTitle.title")}>
      <EditableTitle
        onTitleChange={(value: string) => setTitle(value)}
        title={title}
      />
    </Page>
  );
};
