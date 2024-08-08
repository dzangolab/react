import { useTranslation } from "@dzangolab/react-i18n";
import {
  Card,
  CardBody,
  EditableTitle,
  Page,
  TDataTable,
} from "@dzangolab/react-ui";
import { ChangeEvent, useState } from "react";

import { CodeBlock, Section } from "../../../components/Demo";

const PROPERTIES_DATA = [
  {
    id: 1,
    prop: "allowEdit",
    type: "boolean",
    default: "true",
    description: "Enables or disables the editing functionality.",
  },
  {
    id: 2,
    prop: "disableToggleButton",
    type: "boolean",
    default: "false",
    description: "Disable the toggle button when set to true.",
  },
  {
    id: 3,
    prop: "useToggleButton",
    type: "boolean",
    default: "true",
    description:
      "Use toggle button to toggle between editing and display mode. Otherwise, title itself will handle the functionality on `click event`",
  },
  {
    id: 4,
    prop: "onTitleChange",
    type: "(event: ChangeEvent<HTMLInputElement>) => void",
    default: "undefined",
    description: "Callback function triggered when the title input changes.",
  },
  {
    id: 5,
    prop: "onTitleUpdate",
    type: "(title: string) => void",
    default: "undefined",
    description:
      "Callback function triggered when the title is updated after leaving the input field.",
  },
  {
    id: 6,
    prop: "placeholder",
    type: "string",
    default: "undefined",
    description: "Placeholder text for the input field when in edit mode.",
  },
  {
    id: 7,
    prop: "title",
    type: "string",
    default: "undefined",
    description: "The initial title to display.",
  },
  {
    id: 8,
    prop: "titleLevel",
    type: '"h1" | "h2" | "h3" | "h4" | "h5" | "h6"',
    default: '"h1"',
    description: "Specifies the HTML heading level for the displayed title.",
  },
  {
    id: 9,
    prop: "toggler",
    type: "JSX.Element",
    default: "<Button />",
    description:
      "A custom toggle button element that activates edit mode. If not provided, a default button will be rendered.",
  },
];

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
      <Section title={t("headers.usage")}>
        <p>{t("editableTitle.usage")}</p>
        <CodeBlock exampleCode="import { EditableTitle } from '@dzangolab/react-ui';" />
      </Section>

      <Section title={"Properties"}>
        <TDataTable
          columns={[
            {
              accessorKey: "prop",
              header: "Properties",
            },
            {
              accessorKey: "type",
              header: "Type",
            },
            {
              accessorKey: "default",
              header: "Default",
            },
            {
              accessorKey: "description",
              header: "Description",
            },
          ]}
          data={PROPERTIES_DATA}
          paginated={false}
        />
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
        <CodeBlock exampleCode="<EditableTitle title={'Hello'} titleLevel='h3' onTitleChange={handleTitleChange}/>" />
      </Section>

      <Section title={t("editableTitle.examples.disabled.title")}>
        <p>{t("editableTitle.examples.disabled.description")}</p>
        <Card className="editable-title" outlined>
          <CardBody>
            <EditableTitle title={"Hello"} titleLevel="h3" allowEdit={false} />
          </CardBody>
        </Card>
        <CodeBlock exampleCode="<EditableTitle title={'Hello'} titleLevel='h3' allowEdit={false} />" />
      </Section>

      <Section title={t("editableTitle.examples.customToggler.title")}>
        <p>{t("editableTitle.examples.customToggler.description")}</p>
        <Card className="editable-title" outlined>
          <CardBody>
            <EditableTitle
              title={"Hello"}
              titleLevel="h3"
              toggler={<i className="pi pi-pen-to-square"></i>}
            />
          </CardBody>
        </Card>
        <CodeBlock exampleCode="<EditableTitle title={'Hello'} titleLevel='h3' toggler={<i className='pi pi-pen-to-square'></i>} />" />
      </Section>
    </Page>
  );
};
