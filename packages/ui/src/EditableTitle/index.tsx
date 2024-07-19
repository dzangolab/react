import { ChangeEvent, HTMLAttributes, createElement, useState } from "react";

import { Input } from "..";

interface IProperties extends Omit<HTMLAttributes<HTMLHeadElement>, "onClick"> {
  placeHolder?: string;
  title: string;
  titleLevel?: "h1" | "h2" | "h3" | "h4";
  onTitleUpdate?: (title: string) => void;
  onTitleChange?: (title: string) => void;
}

export const EditableTitle = ({
  className = "",
  placeHolder,
  title,
  titleLevel = "h1",
  onTitleUpdate,
  onTitleChange,
  ...others
}: IProperties) => {
  const [isEditModeOn, setEditModeOn] = useState<boolean>(false);
  const [titleValue, setTitleValue] = useState(title);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitleValue(event.target.value);

    if (onTitleChange) {
      onTitleChange(event.target.value);
    }
  };

  const handleTitleClick = () => {
    setEditModeOn(true);
  };

  const handleBlur = () => {
    setEditModeOn(false);

    if (onTitleUpdate) {
      onTitleUpdate(titleValue);
    }
  };

  const renderContent = () => {
    if (isEditModeOn) {
      return (
        <Input
          autoFocus
          className="dz-editable-title-field"
          name="title"
          placeholder={placeHolder}
          value={title}
          onChange={handleChange}
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

  return (
    <>
      <div className={`dz-editable-title ${className}`.trimEnd()}>
        {renderContent()}
      </div>
    </>
  );
};
