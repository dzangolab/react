import { useTranslation } from "@dzangolab/react-i18n";
import { EditableTitle, Page } from "@dzangolab/react-ui";
import { useState } from "react";

export const EditableTitleDemo = () => {
  const [title, setTitle] = useState("Hello");
  const { t } = useTranslation("ui");

  const handleTitleUpdate = () => {
    // eslint-disable-next-line no-console
    console.log("The updated title is:", title);
  };

  return (
    <Page title={t("editableTitle.title")}>
      <EditableTitle
        title={title}
        onTitleChange={(value: string) => setTitle(value)}
        onTitleUpdate={handleTitleUpdate}
      />
    </Page>
  );
};
