import React, {
  ChangeEvent,
  FocusEvent,
  HTMLAttributes,
  KeyboardEvent,
  cloneElement,
  createElement,
  useState,
} from "react";

import { Input } from "../FormWidgets";

interface IProperties extends Omit<HTMLAttributes<HTMLHeadElement>, "onClick"> {
  isTogglerEnabled?: boolean;
  onTitleChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onTitleUpdate?: (title: string) => void;
  placeHolder?: string;
  title: string;
  titleLevel?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  toggler?: JSX.Element;
}

export const EditableTitle = ({
  isTogglerEnabled = false,
  onTitleChange,
  onTitleUpdate,
  placeHolder,
  title,
  titleLevel = "h1",
  toggler = <i className="pi pi-pen-to-square"></i>,
  ...others
}: IProperties) => {
  const [isEditModeOn, setEditModeOn] = useState<boolean>(false);
  const [titleValue, setTitleValue] = useState(title);

  const toggle = () => {
    setEditModeOn((previous) => !previous);
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    if (event.target.value) {
      setTitleValue(event.target.value);
    }

    if (onTitleUpdate) {
      onTitleUpdate(event.target.value);
    }

    setEditModeOn(false);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();

      event.currentTarget.blur();
    }
  };

  const renderTitle = () => {
    const titleElement = createElement(
      titleLevel,
      {
        ...others,
        onClick: isTogglerEnabled ? undefined : toggle,
      },
      titleValue,
    );

    if (isTogglerEnabled) {
      const togglerElement = cloneElement(toggler, {
        onClick: toggle,
      });

      return (
        <div className="dz-editable-title">
          {titleElement}
          {togglerElement}
        </div>
      );
    }

    return titleElement;
  };

  return isEditModeOn ? (
    <Input
      autoFocus
      name="title"
      placeholder={placeHolder}
      defaultValue={onTitleChange ? title : titleValue}
      onChange={onTitleChange}
      onBlur={handleBlur}
      onKeyUp={handleKeyPress}
    />
  ) : (
    renderTitle()
  );
};
