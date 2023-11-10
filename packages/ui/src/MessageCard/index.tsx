import { ReactNode } from "react";

type MessageCardProperties = {
  message: string;
  icon?: string | ReactNode;
  showIcon?: boolean;
};

const MessageCard = ({
  message,
  icon,
  showIcon = true,
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
      {message}
    </div>
  );
};

export default MessageCard;
