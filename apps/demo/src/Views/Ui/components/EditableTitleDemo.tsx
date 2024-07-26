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
    setValue(event.target.value);
  };

  return (
    <Page
      title={t("editableTitle.title")}
      subtitle={t("editableTitle.subtitle")}
    >
      <Section title={t("editableTitle.import.title")}>
        <CodeBlock exampleCode="import { EditableTitle } from '@dzangolab/react-ui';" />
      </Section>

      <Section title={t("editableTitle.examples.basic.title")}>
        <p>{t("editableTitle.examples.basic.description")}</p>
        <Card className="editable-title" outlined>
          <CardBody>
            <EditableTitle
              title={"Hello"}
              titleLevel="h3"
              onTitleUpdate={handleTitleUpdate}
            />
          </CardBody>
        </Card>
        <CodeBlock exampleCode="<EditableTitle title={'Hello'}  titleLevel='h3' onTitleUpdate={handleTitleUpdate}/>" />
      </Section>

      <Section title={t("editableTitle.examples.controlled.title")}>
        <p>{t("editableTitle.examples.controlled.description")}</p>
        <Card className="editable-title" outlined>
          <CardBody>
            <EditableTitle
              title={"Hello"}
              titleLevel="h3"
              onTitleChange={handleTitleChange}
            />
            {value ? <CodeBlock exampleCode={value} /> : null}
          </CardBody>
        </Card>
        <CodeBlock exampleCode="<EditableTitle title={'Hello'} titleLevel='h3'/> onTitleChange={handleTitleChange}/>" />
      </Section>

      <Section title={t("editableTitle.examples.toggleable.title")}>
        <p>{t("editableTitle.examples.toggleable.description")}</p>
        <Card className="editable-title" outlined>
          <CardBody>
            <EditableTitle title={"Hello"} titleLevel="h3" isTogglerEnabled />
          </CardBody>
        </Card>
        <CodeBlock exampleCode="<EditableTitle title={'Hello'} titleLevel='h3' isTogglerEnabled/>" />
      </Section>

      <Section title={t("editableTitle.examples.customToggler.title")}>
        <p>{t("editableTitle.examples.customToggler.description")}</p>
        <Card className="editable-title" outlined>
          <CardBody>
            <EditableTitle
              title={"Hello"}
              titleLevel="h3"
              toggler={<i className="pi pi-pen-to-square"></i>}
              isTogglerEnabled
            />
          </CardBody>
        </Card>
        <CodeBlock exampleCode="<EditableTitle title={'Hello'} titleLevel='h3' toggler={<i className='pi pi-pen-to-square'></i>} isTogglerEnabled/>" />
      </Section>
    </Page>
  );
};
