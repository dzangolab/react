import {
  ChangeEvent,
  HTMLAttributes,
  createElement,
  useEffect,
  useRef,
  useState,
} from "react";

import { Input } from "..";

interface IProperties extends HTMLAttributes<HTMLHeadElement> {
  placeHolder?: string;
  titleLevel?: "h1" | "h2" | "h3" | "h4";
  title: string;
  onTitleUpdate?: () => void;
  onTitleChange: (title: string) => void;
}

export const EditableTitle = ({
  placeHolder,
  titleLevel = "h1",
  title,
  onTitleUpdate,
  onTitleChange,
  ...others
}: IProperties) => {
  const [isEditModeOn, setEditModeOn] = useState<boolean>(false);
  const inputReference = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditModeOn) {
      inputReference.current?.focus();
    }
  }, [isEditModeOn]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onTitleChange(event.target.value);
  };

  const handleClick = () => {
    setEditModeOn(true);
  };

  const handleBlur = () => {
    setEditModeOn(false);

    if (onTitleUpdate) {
      onTitleUpdate();
    }
  };

  const renderContent = () => {
    if (isEditModeOn) {
      return (
        <Input
          placeholder={placeHolder}
          ref={inputReference}
          value={title}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      );
    }

    return createElement(
      titleLevel,
      { className: "dz-editable-title", onClick: handleClick, ...others },
      title,
    );
  };

  return <>{renderContent()}</>;
};
