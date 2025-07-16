import { useTranslation } from "@dzangolab/react-i18n";
import { Button, Message, Page, TDataTable } from "@dzangolab/react-ui";
import { useNavigate } from "react-router-dom";

import { CodeBlock, Section } from "../../../components/Demo";

const propertiesData = [
  {
    default: "false",
    description:
      "Displays a close icon if true, allowing the message to be dismissed.",
    prop: "enableClose",
    type: "boolean",
  },
  {
    default: "-",
    description: "Icon to display alongside the message.",
    prop: "icon",
    type: "string | ReactNode",
  },
  {
    default: "-",
    description: "The message text to display in the component.",
    prop: "message",
    type: "string | ReactNode",
  },
  {
    default: "-",
    description: "Function to be called when the message is closed.",
    prop: "onClose",
    type: "() => void",
  },
  {
    default: "info",
    description:
      "Defines the styling severity of the message. Defaults to 'info'.",
    prop: "severity",
    type: `"info" | "success" | "warning" | "danger"`,
  },
  {
    default: "true",
    description:
      "Show default icon based on severity or custom icon if provided.",
    prop: "showIcon",
    type: "boolean",
  },
];

export const MessageDemo = () => {
  const [t] = useTranslation("ui");
  const navigate = useNavigate();

  return (
    <Page
      title={t("message.title")}
      subtitle={t("message.subtitle")}
      toolbar={
        <Button
          label={t("buttons.back")}
          variant="textOnly"
          iconLeft={<i className="pi pi-chevron-left"></i>}
          onClick={() => navigate("..")}
        />
      }
    >
      <Section title={t("headers.usage")}>
        <p>{t("common.usage", { component: "Message" })}</p>
        <CodeBlock exampleCode='import { Message } from "@dzangolab/react-ui"' />
      </Section>

      <Section title={t("message.usage.basic")}>
        <Message message={t("message.contents.content1")} />
        <CodeBlock exampleCode='<Message message="Season sale: Up to 50% off selected items!" />' />
      </Section>

      <Section title={t("message.usage.customMessage")}>
        <Message message={<b>{t("message.contents.content1")}</b>} />
        <CodeBlock exampleCode="<Message message={<b>Season sale: Up to 50% off selected items!</b>} />" />
      </Section>

      <Section title={t("message.usage.icons.icon")}>
        <Message
          message={t("message.contents.content2")}
          icon="pi pi-android"
        />
        <CodeBlock
          exampleCode='<Message 
  message="New features just launched! Check them out!"
  icon="pi pi-android"
/>'
        />
      </Section>

      <Section title={t("message.usage.icons.customIcon")}>
        <Message
          message={t("message.contents.content3")}
          icon={<i className="pi pi-bell" />}
        />
        <CodeBlock
          exampleCode='<Message 
  message="New Year, New You: Start fresh with our services!"
  icon={<i className="pi pi-bell" />}
/>'
        />
      </Section>

      <Section title={t("message.usage.enableClose")}>
        <Message
          enableClose={true}
          icon={<i className="pi pi-bell" />}
          message={t("message.contents.content4")}
        />
        <CodeBlock
          exampleCode='<Message 
  message="We value your feedback: take our quick survey!"
  icon={<i className="pi pi-bell" />}
  enableClose={true}
/>'
        />
      </Section>

      <Section title={t("message.usage.severity")}>
        <Message message="Info message" severity="info" />
        <Message message="Success message" severity="success" />
        <Message message="Warning message" severity="warning" />
        <Message message="Danger message" severity="danger" />

        <CodeBlock
          exampleCode='<Message message="Info message" severity="info" />
<Message message="Success message" severity="success" />
<Message message="Warning message" severity="warning" />
<Message message="Danger message" severity="danger" />'
        />
      </Section>
      <Section title={t("message.usage.hideIcon")}>
        <Message message={t("message.contents.content1")} showIcon={false} />
        <CodeBlock exampleCode='<Message message="Season sale: Up to 50% off selected items!" showIcon={false} />' />
      </Section>
      <Section
        title={t("headers.propertiesValue", {
          value: "MessageProperties",
        })}
      >
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
          data={propertiesData}
          paginated={false}
        />
      </Section>
    </Page>
  );
};
