import { useTranslation } from "@dzangolab/react-i18n";
import { Card, CardBody, EditableTitle, Page } from "@dzangolab/react-ui";
import { ChangeEvent, useState } from "react";

import { CodeBlock, Section } from "../../../components/Demo";

export const EditableTitleDemo = () => {
  const { t } = useTranslation("ui");
  const [value, setValue] = useState("");

  const handleTitleUpdate = (title: string) => {
    // eslint-disable-next-line no-console
    console.log("The updated title is:", title);
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line no-console
    setValue(event.target.value);
  };

  return (
    <Page
      title={t("editableTitle.title")}
      subtitle="Editable title is a extenstion to a page or section title which can be edited."
    >
      <Section title="Import">
        <CodeBlock exampleCode="import { EditableTitle } from '@dzangolab/react-ui';" />
      </Section>
      <Section
        title="Basic"
        subtitle="Editable title can be used by passing a title property. Title level is optional, it is 'h1' by default."
      >
        <CodeBlock exampleCode="<EditableTitle title={'Hello'}  titleLevel='h3'/>" />
        <Card outlined>
          <CardBody>
            <EditableTitle title={"Hello"} titleLevel="h3" />
          </CardBody>
        </Card>
      </Section>

      <Section
        title="Controlled"
        subtitle="Editable title can be used as a controllable input by passing onTitleChange property."
      >
        <CodeBlock exampleCode="<EditableTitle title={'Hello'} titleLevel='h3'/> onTitleChange={handleTitleChange}/>" />
        <Card outlined>
          <CardBody>
            <EditableTitle
              title={"Hello"}
              titleLevel="h3"
              onTitleChange={handleTitleChange}
            />
            {value ? <CodeBlock exampleCode={value} /> : null}
          </CardBody>
        </Card>
      </Section>
      <Section
        title="Toggleable"
        subtitle="The title can be made to toggle using button as well. To do this pass the isToggleEnabled option, in this case the title is not clickable."
      >
        <CodeBlock exampleCode="<EditableTitle title={'Hello'} titleLevel='h3' isTogglerEnabled/> " />
        <Card outlined>
          <CardBody>
            <EditableTitle
              title={"Hello"}
              titleLevel="h3"
              onTitleUpdate={handleTitleUpdate}
              isTogglerEnabled
            />
          </CardBody>
        </Card>
      </Section>
      <Section></Section>
    </Page>
  );
};
