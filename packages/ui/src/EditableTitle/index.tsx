import React, {
  ChangeEvent,
  FocusEvent,
  HTMLAttributes,
  KeyboardEvent,
  cloneElement,
  createElement,
  useState,
} from "react";

import { Button } from "../Buttons";
import { Input } from "../FormWidgets";

interface IProperties extends Omit<HTMLAttributes<HTMLHeadElement>, "onClick"> {
  allowEdit?: boolean;
  showToggler?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  handleUpdate?: (title: string) => void;
  placeholder?: string;
  title: string;
  titleLevel?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  toggler?: JSX.Element;
}

export const EditableTitle = ({
  allowEdit = true,
  showToggler = true,
  onChange,
  handleUpdate,
  placeholder,
  title,
  titleLevel = "h1",
  toggler = (
    <Button
      variant="textOnly"
      severity="secondary"
      iconLeft="pi pi-pencil"
    ></Button>
  ),
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

    if (handleUpdate) {
      handleUpdate(event.target.value);
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
        onClick: showToggler ? undefined : toggle,
      },
      titleValue,
    );

    if (showToggler) {
      const togglerElement = cloneElement(toggler, {
        disabled: !allowEdit,
        onClick: allowEdit ? toggle : undefined,
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
      placeholder={placeholder}
      defaultValue={onChange ? title : titleValue}
      onChange={onChange}
      onBlur={handleBlur}
      onKeyUp={handleKeyPress}
    />
  ) : (
    renderTitle()
  );
};
