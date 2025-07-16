import { useTranslation } from "@dzangolab/react-i18n";
import { Button, Message, Page, TDataTable } from "@dzangolab/react-ui";
import { useNavigate } from "react-router-dom";

import { CodeBlock, Section } from "../../../components/Demo";

export const MessageDemo = () => {
  const [t] = useTranslation("ui");
  const navigate = useNavigate();

  const propertiesData = [
    {
      default: "false",
      description: t("message.table.propDescription.enableClose"),
      prop: "enableClose",
      type: "boolean",
    },
    {
      default: "-",
      description: t("message.table.propDescription.icon"),
      prop: "icon",
      type: "string | ReactNode",
    },
    {
      default: "-",
      description: t("message.table.propDescription.message"),
      prop: "message",
      type: "string | string[] | ReactNode",
    },
    {
      default: "-",
      description: t("message.table.propDescription.onClose"),
      prop: "onClose",
      type: "() => void",
    },
    {
      default: "info",
      description: t("message.table.propDescription.severity"),
      prop: "severity",
      type: `"info" | "success" | "warning" | "danger"`,
    },
    {
      default: "true",
      description: t("message.table.propDescription.showIcon"),
      prop: "showIcon",
      type: "boolean",
    },
  ];

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

      <Section title={t("message.usage.arrayMessage")}>
        <Message
          message={[
            t("message.contents.content1"),
            t("message.contents.content2"),
            t("message.contents.content3"),
          ]}
          enableClose={true}
        />
        <CodeBlock
          exampleCode="<Message
  message={
    [
      'Season Sale: Enjoy massive discounts with up to 50% off on a wide range of selected items — from fashion to electronics, don’t miss out on these limited-time offers!',
      'New features just launched! Check them out!',
      'New Year, New You: Start fresh with our services!'
    ]}
    enableClose={true}
/>"
        />
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
        <Message message={t("message.contents.info")} severity="info" />
        <Message message={t("message.contents.success")} severity="success" />
        <Message message={t("message.contents.warning")} severity="warning" />
        <Message message={t("message.contents.danger")} severity="danger" />

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
              header: t("message.table.header.properties"),
            },
            {
              accessorKey: "type",
              header: t("message.table.header.type"),
            },
            {
              accessorKey: "default",
              header: t("message.table.header.default"),
            },
            {
              accessorKey: "description",
              header: t("message.table.header.description"),
            },
          ]}
          data={propertiesData}
          paginated={false}
        />
      </Section>
    </Page>
  );
};
