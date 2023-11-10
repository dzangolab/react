import { ReactNode } from "react";

type MessageProperties = {
  message: string;
  icon?: string | ReactNode;
  showIcon?: boolean;
};

const Message = ({ message, icon, showIcon = false }: MessageProperties) => {
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
    <div className="message-icon-wrapper">
      {renderIcon()}
      <span className="message">{message}</span>
    </div>
  );
};

export default Message;
