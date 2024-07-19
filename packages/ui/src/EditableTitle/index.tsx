import {
  ChangeEvent,
  FocusEvent,
  HTMLAttributes,
  createElement,
  useState,
} from "react";

import { Input } from "../FormWidgets";

interface IProperties extends Omit<HTMLAttributes<HTMLHeadElement>, "onClick"> {
  placeHolder?: string;
  title: string;
  titleLevel?: "h1" | "h2" | "h3" | "h4";
  onTitleUpdate?: (title: string) => void;
  onTitleChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const EditableTitle = ({
  placeHolder,
  title,
  titleLevel = "h1",
  onTitleUpdate,
  onTitleChange,
  ...others
}: IProperties) => {
  const [isEditModeOn, setEditModeOn] = useState<boolean>(false);
  const [titleValue, setTitleValue] = useState(title);

  const handleTitleClick = () => {
    setEditModeOn(true);
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    if (event.target.value) {
      setTitleValue(event.target.value);
    }

    setEditModeOn(false);

    if (onTitleUpdate) {
      onTitleUpdate(event.target.value);
    }
  };

  const renderContent = () => {
    if (isEditModeOn) {
      return (
        <Input
          autoFocus
          name="title"
          placeholder={placeHolder}
          defaultValue={onTitleChange ? title : titleValue}
          onChange={onTitleChange}
          onBlur={handleBlur}
        />
      );
    }

    return createElement(
      titleLevel,
      {
        ...others,
        onClick: handleTitleClick,
      },
      titleValue,
    );
  };

  return renderContent();
};
