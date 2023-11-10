import { ReactNode } from "react";

type MessageProperties = {
  message: string;
  icon?: string | ReactNode;
};

const Message = ({ message, icon }: MessageProperties) => {
  const renderIcon = () => {
    return (
      <span className="icon">
        {typeof icon === "string" ? <i className={icon} /> : icon}
      </span>
    );
  };

  return (
    <div className="message">
      {renderIcon()}
      <span className="message-content">{message}</span>
    </div>
  );
};

export default Message;
