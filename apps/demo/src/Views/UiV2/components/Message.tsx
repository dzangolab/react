import { useTranslation } from "@dzangolab/react-i18n";
import { Message, Page } from "@dzangolab/react-ui";

export const MessageDemo = () => {
  const [t] = useTranslation("ui");

  return (
    <Page title={t("v2.message.title")}>
      <Message
        message="This is a very important message."
        icon={<i className="pi pi-info-circle" />}
      />
    </Page>
  );
};
