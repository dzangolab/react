import { useTranslation } from "@dzangolab/react-i18n";
import { Message } from "@dzangolab/react-ui";

const MessageWrapper = () => {
  const { t } = useTranslation("ui");

  return (
    <Message
      message={t("message.content")}
      icon={<i className="pi pi-info-circle" />}
    />
  );
};

export default MessageWrapper;
