import { ReactNode } from "react";

type MessageCardProperties = {
  message: string;
  icon?: string | ReactNode;
  showIcon?: boolean;
};

const MessageCard = ({
  message,
  icon,
  showIcon = false,
}: MessageCardProperties) => {
  const renderIcon = () => {
    if (showIcon) {
      return (
        <span className="icon">
          {typeof icon === "string" ? <i className={icon} /> : icon}
        </span>
      );
    }

    return null;
  };

  return (
    <div className="message-card">
      {renderIcon()}
      <span className="message">{message}</span>
    </div>
  );
};

export default MessageCard;
