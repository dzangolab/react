import {
  ChangeEvent,
  HTMLAttributes,
  createElement,
  useEffect,
  useRef,
  useState,
} from "react";

import { Input } from "..";

interface IProperties extends Omit<HTMLAttributes<HTMLHeadElement>, "onClick"> {
  placeHolder?: string;
  title: string;
  titleLevel?: "h1" | "h2" | "h3" | "h4";
  onTitleUpdate?: () => void;
  onTitleChange: (title: string) => void;
}

export const EditableTitle = ({
  className,
  placeHolder,
  title,
  titleLevel = "h1",
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

  const handleTitleClick = () => {
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
          name="dz-editable-title-field"
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
      {
        ...others,
        className: `dz-editable-title ${className}`.trimEnd(),
        onClick: handleTitleClick,
      },
      title,
    );
  };

  return <>{renderContent()}</>;
};
