import { EditableTitle, Page } from "@dzangolab/react-ui";
import { useState } from "react";

export const EditableTitleDemo = () => {
  const [title, setTitle] = useState("Hello");

  return (
    <Page title="EditableTitle">
      <EditableTitle
        onTitleChange={(value: string) => setTitle(value)}
        title={title}
      />
    </Page>
  );
};
