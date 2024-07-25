import { useTranslation } from "@dzangolab/react-i18n";
import { Card, CardBody, EditableTitle, Page } from "@dzangolab/react-ui";

import { CodeBlock, Section } from "../../../components/Demo";

export const EditableTitleDemo = () => {
  const { t } = useTranslation("ui");

  const handleTitleUpdate = (title: string) => {
    // eslint-disable-next-line no-console
    console.log("The updated title is:", title);
  };

  return (
    <Page
      title={t("editableTitle.title")}
      subtitle="Editable title is a extenstion to a page or section title which can be edited."
    >
      <Section title="Import">
        <CodeBlock exampleCode="import { EditableTitle } from '@dzangolab/react-ui';" />
      </Section>
      <Section title="Basic">
        <CodeBlock exampleCode="<EditableTitle title={'Hello'}  titleLevel='h3'/>" />
        <Card outlined>
          <CardBody>
            <EditableTitle
              title={"Hello"}
              onTitleUpdate={handleTitleUpdate}
              titleLevel="h3"
              isTogglerEnabled={true}
            />
          </CardBody>
        </Card>
      </Section>

      <Section></Section>
    </Page>
  );
};
